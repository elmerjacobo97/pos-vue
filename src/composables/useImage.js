import { computed, ref } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uid } from 'uid'

export default function useImage() {
  const url = ref(null)
  const storage = useFirebaseStorage()

  const onFileChange = (e) => {
    const file = e.target.files[0]
    const fileName = uid() + '.jpg'
    const sRef = storageRef(storage, `/products/${fileName}`)

    // Sube el archivo al storage
    const uploadTask = uploadBytesResumable(sRef, file)

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.log('ERROR', error)
      },
      () => {
        // console.log(uploadTask.snapshot.ref)
        // Upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          url.value = downloadURL
        })
      }
    )
  }

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null
  })

  return {
    url,
    onFileChange,
    isImageUploaded
  }
}
