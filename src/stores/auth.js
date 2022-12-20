import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut,
signInWithEmailAndPassword, onAuthStateChanged,
signInAnonymously, GoogleAuthProvider,
signInWithPopup } from "firebase/auth";
import { auth } from '@/js/firebase'
import { useNotesStore } from '@/stores/note'

export const useAuthStore = defineStore('AuthStore', {
  state: () => ({
    user: {} 
  }),

  actions: {

    init(){
      onAuthStateChanged(auth, (user) => {
        const useNotes = useNotesStore()

        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push({ name: 'home' })
          useNotes.init()
        } else {
          console.log('user logout')
          this.user = {} 
          this.router.push({ name: 'auth' })
          useNotes.clearNotes()
        }
      });
    },

    registerUser (credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((err) => {
          alert('Already registered account')
      });
    },

    signInUser (credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((err) => {
        alert('Account not found')
      });
    },

    signOutUser () {
      signOut(auth).then(() => {
      }).catch((err) => {
        alert('Unable to logout')
      });
    },

    Demo () {
       signInAnonymously(auth)
       .then(() => {
       })
       .catch((err) => {
         console.log(err.message)
       });
    },

    signInWithGoogle () {
      const provider = new GoogleAuthProvider()

      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        }).catch((errr) => {
          console.log(err.message)
      });
    }

  }
})
