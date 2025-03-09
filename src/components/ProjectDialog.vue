<template>
  <Dialog v-model:open="isOpen" @update:open="handleDialogClose">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Tạo {{ title }} mới</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Tên {{ title }}:</label>
          <input
            v-model="newData"
            id="name"
            :placeholder="'Nhập ' + title"
            class="input-field"
          />
          <label for="description">Nhập mô tả:</label>
          <input
            v-model="newDescription"
            id="description"
            :placeholder="'Nhập mô tả ' + title"
            class="input-field"
          />
        </div>
        <DialogFooter class="dialog-footer">
          <Button class="confirm" type="submit">Thêm {{ title }}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useDialogStore, useProjectStore, useFormStore } from "../stores/store";
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
const dialogStore = useDialogStore();
const projectStore = ProjectStore();
const surveyStore = SurveyStore();
const isOpen = ref(false);
const title = ref("");

// Đồng bộ isOpen khi store thay đổi
watch(
  () => dialogStore.isOpen,
  (newVal) => {
    isOpen.value = newVal;
    title.value = dialogStore.title;
  }
);

// Khi dialog đóng (do nhấn "X" hoặc click ra ngoài)
const handleDialogClose = (newVal) => {
  if (!newVal) {
    dialogStore.closeDialog(); // Cập nhật store để có thể mở lại sau
  }
};

const closeDialog = () => {
  dialogStore.closeDialog();
};
// Xử lý thêm project hoặc form khi submit cho dialog
const useProject = useProjectStore();
const useForm = useFormStore();
const newData = ref("");
const newDescription = ref("");
// Lấy ngày hiện tại DD/MM/YYYY
const getCurrentDate = () => {
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};



const handleSubmit = async () => {
  console.log(newData.value, newDescription.value);
  if (newData.value.trim() === "") return;
  if (title.value === "dự án") {
    const payload = {
      projectName: newData.value,
      description: newDescription.value,
    };
    try{
      await projectStore.createProject(payload);
      await projectStore.getAllProjects();
      // console.log("🔄 Danh sách dự án sau khi fetch:", useProject.projects);
      toast.success("Tạo dự án thành công!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);

    }catch(e){
      console.log(e)
      toast.error("Lỗi khi tạo dự án!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }

    // ///////
    useProject.addProject({
      id: useProject.projects.length + 1,
      name: newData.value,
      surveys: 0,
      modified: getCurrentDate(),
      owner: "ncthien2805@gmail.com",
      description: newDescription.value,
    });
  }
  if (title.value === "khảo sát") {
    const payload = {
      surveyName: newData.value,
      description: newDescription.value,
    };
    try{
      await surveyStore.createSurvey(route.params.id, payload);
      await surveyStore.getAllSurvey(route.params.id);
      toast.success("Tạo khảo sát thành công!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }catch(error){
      console.log(error)
      toast.error("Lỗi khi tạo khảo sát!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }

    useForm.addSurvey({
      id: useForm.forms.surveys.length + 1,
      name: newData.value,
      responses: 0,
    });
  }
  newData.value = "";
  newDescription.value = "";
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
