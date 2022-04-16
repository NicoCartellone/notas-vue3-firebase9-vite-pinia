import { addDoc, collection, getDocs, query, where, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { db } from '../firebaseConfig'
import { auth } from '../firebaseConfig'
import router from '../router'

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false,
        loading: false
    }),
    actions: {
        async getNotas() {

            if (this.documents.length !== 0) {
                return;
            }

            this.loadingDoc = true
            try {
                const q = query(collection(db, "notas"), where("user", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, doc.data())
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingDoc = false
            }
        },
        async addNota(name) {
            this.loading = true
            try {
                const objetoDoc = {
                    name: name,
                    user: auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "notas"), objetoDoc)
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id
                })
            } catch (error) {
                console.log(error.code)
                return error.code
            } finally {
                this.loading = false
            }
        },
        async deletNota(id) {
            this.loading = true
            try {
                const docRef = doc(db, 'notas', id)
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    throw new Error("No existe la nota")
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("Nota de otro usuario")
                }

                await deleteDoc(docRef)
                this.documents = this.documents.filter(item => item.id !== id)
            } catch (error) {
                return error.message
            } finally {
                this.loading = false
            }
        },
        async leerNota(id) {
            try {
                const docRef = doc(db, 'notas', id)
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    throw new Error("No existe la nota")
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("Nota de otro usuario")
                }

                return docSnap.data().name
            } catch (error) {
                console.log(error.message)
            } finally {

            }
        },
        async updateNota(id, name) {
            this.loading = true
            try {
                const docRef = doc(db, 'notas', id)
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    throw new Error("No existe la nota")
                }

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("Nota de otro usuario")
                }

                await updateDoc(docRef, {
                    name: name
                })

                this.documents = this.documents.map(item => item.id === id ? ({ ...item, name: name }) : item)
                router.push('/notas')
            } catch (error) {
                console.log(error.message)
                return error.message
            } finally {
                this.loading = false
            }
        }
    }
})