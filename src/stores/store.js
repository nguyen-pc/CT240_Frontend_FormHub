import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const isOpen = ref(false)
  const title = ref('')
  const data = ref({})
  let callback = null

  const openDialog = (dialogTitle, dialogData, cb) => {
    title.value = dialogTitle
    data.value = dialogData
    isOpen.value = true
    callback = cb || null
  }

  const closeDialog = () => {
    isOpen.value = false
    if (callback) {
      callback() // ✅ Gọi callback khi dialog đóng
      callback = null // ✅ Reset để tránh gọi lại lần sau
    }
  }

  return { isOpen, title, data, openDialog, closeDialog }
})

export const useDialogStoreEdit = defineStore('dialogEdit', () => {
  const isOpenEdit = ref(false)
  const titleEdit = ref('')
  const idEdit = ref()
  const nameEdit = ref('')
  const descriptionEdit = ref('')
  const dataEdit = ref({})
  let callback = null

  const openDialogEdit = (dialogTitle, id, name, description, cb) => {
    titleEdit.value = dialogTitle
    idEdit.value = id
    nameEdit.value = name
    descriptionEdit.value = description
    isOpenEdit.value = true
    callback = cb || null
  }

  const closeDialogEdit = () => {
    isOpenEdit.value = false
    if (callback) {
      callback() // ✅ Gọi callback khi dialog đóng
      callback = null // ✅ Reset để tránh gọi lại lần sau
    }
  }
  console.log('Data Edit', dataEdit.value)

  return {
    isOpenEdit,
    titleEdit,
    idEdit,
    nameEdit,
    descriptionEdit,
    dataEdit,
    openDialogEdit,
    closeDialogEdit
  }
})

export const useProjectStore = defineStore('projectStore', () => {
  const projects = ref(
    JSON.parse(localStorage.getItem('projects')) || [
      {
        id: 1,
        name: 'Projects 1',
        surveys: 4,
        modified: '15/02/2025',
        owner: 'ncthien2805@gmail.com',
        description: 'new project 1'
      },
      {
        id: 2,
        name: 'Projects 2',
        surveys: 15,
        modified: '01/02/2025',
        owner: 'phapchau@gmail.com',
        description: 'new project 2'
      },
      {
        id: 3,
        name: 'Projects 3',
        surveys: 1,
        modified: '02/02/2025',
        owner: 'ncthien2805@gmail.com',
        description: 'new project 3'
      }
    ]
  )
  const addProject = (newProject) => {
    projects.value.push(newProject)
  }

  watch(
    projects,
    (newProjects) => {
      localStorage.setItem('projects', JSON.stringify(newProjects))
    },
    { deep: true }
  )
  return { projects, addProject }
})

export const useFormStore = defineStore('formStore', () => {
  const forms = ref(
    JSON.parse(localStorage.getItem('forms')) || {
      surveys: [
        { id: 1, name: 'Form 1', responses: 3 },
        { id: 2, name: 'Form 2', responses: 115 },
        { id: 3, name: 'Form 3', responses: 7 },
        { id: 4, name: 'Form 4', responses: 7 },
        { id: 5, name: 'Form 5', responses: 7 },
        { id: 6, name: 'Form 6', responses: 115 },
        { id: 7, name: 'Form 7', responses: 7 }
      ]
    }
  )
  const addSurvey = (newSurvey) => {
    forms.value.surveys.push(newSurvey)
  }

  watch(
    forms,
    (newForms) => {
      localStorage.setItem('forms', JSON.stringify(newForms))
    },
    { deep: true }
  )

  return { forms, addSurvey }
})
//Question
export const useQuestionStore = defineStore('questionStore', () => {
  const questions = ref([
    {
      id: 1,
      title: 'Question 1',
      name: '',
      type: 'short-answer',
      active: true,
      isRequired: false,
      maxLength: '',
      choices: [{ choiceId: 1, choiceText: '', placeholder: 'Tùy chọn 1' }]
    },
    {
      id: 2,
      title: 'Question 2',
      name: '',
      type: 'short-answer',
      active: false,
      iSRrequired: false,
      maxLength: '',
      choices: [{ choiceId: 1, choiceText: '', placeholder: 'Tùy chọn 1' }]
    }
  ])

  const activeQuestion = computed(() => questions.value.find((q) => q.active))

  const setActiveQuestion = (id) => {
    questions.value.forEach((q) => (q.active = q.id === id))
  }
  const addQuestion = () => {
    questions.value.push({
      id: questions.value.length + 1,
      title: `Question ${questions.value.length + 1}`,
      name: '',
      type: 'short-answer',
      active: false,
      isRequired: false,
      maxLength: '',
      choices: [{ id: 1, choiceText: '', placeholder: 'Tùy chọn 1' }]
    })
  }
  const addChoice = () => {
    activeQuestion.value.choices.push({
      choiceId: activeQuestion.value.choices.length + 1,
      choiceText: '',
      placeholder: 'Tùy chọn ' + (activeQuestion.value.choices.length + 1)
    })
  }
  const updateID = () => {
    for (let i = 0; i < questions.value.length; i++) {
      questions.value[i].id = i + 1
      questions.value[i].title = `Question ${i + 1}`
    }
  }
  const updateChoiceID = () => {
    for (let i = 0; i < activeQuestion.value.choices.length; i++) {
      activeQuestion.value.choices[i].id = i + 1
      activeQuestion.value.choices[i].placeholder = `Tùy chọn ${i + 1}`
    }
  }
  return {
    questions,
    activeQuestion,
    setActiveQuestion,
    addQuestion,
    addChoice,
    updateID,
    updateChoiceID
  }
})
