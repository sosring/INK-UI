import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { doc, addDoc, collection, 
query, onSnapshot, where, deleteDoc,
updateDoc, orderBy, limit } 
from "firebase/firestore";

import { db } from '@/js/firebase'
import { useAuthStore } from '@/stores/auth'

let noteCollection;
let notesCollectionQuery;
let getNoteScapShot = null 

export const useNotesStore = defineStore('StoreNotes', {
  state: () => ({
    notes: [],
    noteLoaded: false
  }),

  actions: {

    init(){
      const useAuth = useAuthStore()

      noteCollection = collection(db, 'users' , useAuth.user.id, 'notes')
      notesCollectionQuery = query(noteCollection, orderBy("date", "desc"));
      this.getNotes()
    },

    async getNotes (){

       getNoteScapShot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        const notes = [];

        querySnapshot.forEach((doc) => {

         const note = ({
           id: doc.id,
           content: doc.data().content,
           date: doc.data().date,
           fav: doc.data().fav
         })
         notes.unshift(note)
        });

        this.notes = notes
        this.noteLoaded = true
      });
    },

    async addNote (note){
      await addDoc(noteCollection, {
          date: new Date().getTime().toString(),
          content: note,
          fav: false
      })
    },

    async deleteNote (id) {
      await deleteDoc(doc(noteCollection, id));
    },

    async updateChanges (id, content) {
      await updateDoc(doc(noteCollection, id), {
        content: content,
      });
    },

    async updateFav (id, condition) {
      await updateDoc(doc(noteCollection, id) , {
        fav: condition
      });
    },

    clearNotes () {
      this.notes = []
      if(getNoteScapShot) getNoteScapShot();
    }

  },

  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content
      }
    }
  }
})
