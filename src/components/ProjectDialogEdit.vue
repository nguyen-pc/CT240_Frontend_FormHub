<template>
  <Dialog v-model:open="isOpenEdit" @update:open="handleDialogClose">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sửa {{ titleEdit }} </DialogTitle>
      </DialogHeader>
      <form @submit.prevent="handleSubmit()">
        <div>
          <label for="name">Tên {{ titleEdit }}:</label>
          <input
            v-model="nameEdit"
            id="name"
            :placeholder="'Nhập ' + nameEdit"
            class="input-field"
          />
          <label for="description">Nhập mô tả:</label>
          <input
            v-model="descriptionEdit"
            id="description"
            :placeholder="'Nhập mô tả ' + titleEdit"
            class="input-field"
          />
        </div>
        <DialogFooter class="dialog-footer">
          <Button class="confirm" type="submit">Sửa {{ titleEdit }}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  useDialogStore,
  useProjectStore,
  useFormStore,
  useDialogStoreEdit,
} from "../stores/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProjectStore } from "@/stores/project";
import { SurveyStore } from "@/stores/survey";
import { useRoute } from "vue-router";
import { toast, type ToastOptions } from "vue3-toastify";



const route = useRoute();
const dialogStore = useDialogStoreEdit();
const projectStore = ProjectStore();
const surveyStore = SurveyStore();
const isOpenEdit = ref(false);
const titleEdit = ref("");
const idEdit = ref("");
const nameEdit = ref("");
const descriptionEdit = ref("");
const dataEdit = ref({});

// Đồng bộ isOpen khi store thay đổi
watch(
  () => dialogStore.isOpenEdit,
  (newVal) => {
    isOpenEdit.value = newVal;
    titleEdit.value = dialogStore.titleEdit;
    idEdit.value = dialogStore.idEdit;
    nameEdit.value = dialogStore.nameEdit;
    descriptionEdit.value = dialogStore.descriptionEdit;
    dataEdit.value = dialogStore.dataEdit;
  }
);

// Khi dialog đóng (do nhấn "X" hoặc click ra ngoài)
const handleDialogClose = (newVal) => {
  if (!newVal) {
    dialogStore.closeDialogEdit(); // Cập nhật store để có thể mở lại sau
  }
};

const closeDialog = () => {
  dialogStore.closeDialogEdit();
};
// Xử lý thêm project hoặc form khi submit cho dialog
const useProject = useProjectStore();
const useForm = useFormStore();
// const newData = ref("");
// const descriptionEdit = ref("");
// Lấy ngày hiện tại DD/MM/YYYY
const getCurrentDate = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

const handleSubmit = async () => {
  console.log("title", titleEdit);
  if (nameEdit.value.trim() === "") return;
  if (titleEdit.value === "dự án") {
    const payload = {
      projectId: idEdit.value,
      projectName: nameEdit.value,
      description: descriptionEdit.value,
    };
    try {
      await projectStore.updateProject(payload);
      await projectStore.getAllProjects();
      toast.success("Sửa dự án thành công!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    } catch (error) {
      console.error("Lỗi khi sửa dự án:", error);
      toast.error("Lỗi khi sửa dự án!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }

    // ///////
    useProject.addProject({
      id: useProject.projects.length + 1,
      name: nameEdit.value,
      surveys: 0,
      modified: getCurrentDate(),
      owner: "ncthien2805@gmail.com",
      description: descriptionEdit.value,
    });
  }
  if (titleEdit.value === "Khảo sát") {
    const payload = {
      surveyId: idEdit.value,
      surveyName: nameEdit.value,
      description: descriptionEdit.value,
    };
    try{
      await surveyStore.updateSurvey(route.params.id, payload);
      await surveyStore.getAllSurvey(route.params.id);
      toast.success("Sửa khảo sát thành công!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }catch(error){
      console.log(e)
      console.error("Lỗi khi sửa khảo sát:", error);
      toast.error("Lỗi khi sửa khảo sát!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }

    useForm.addSurvey({
      id: useForm.forms.surveys.length + 1,
      name: nameEdit.value,
      responses: 0,
    });
  }
  nameEdit.value = "";
  descriptionEdit.value =""
  closeDialog();
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.dialog-footer {
  margin-top: 15px;
}

.confirm {
  margin: auto;
}
</style>
