<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" class="w-full justify-between">
          {{ selectedLabel }}
          <span class="ml-2 opacity-50">▼</span>
          <!-- Thay thế ChevronDown -->
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[250px] p-2">
        <Command>
          <CommandInput placeholder="Tìm loại câu hỏi..." />
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="option in options"
                :key="option.value"
                @select="selectOption(option)"
              >
                <span class="mr-2">{{ option.icon }}</span>
                <!-- Dùng emoji -->
                {{ option.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const options = [
  { label: "Câu trả lời ngắn", value: "TEXT", icon: "📝" },
  { label: "File", value: "FILE_UPLOAD", icon: "📂" },
  { label: "Trắc nghiệm", value: "MULTIPLE_CHOICE", icon: "❓" },
  { label: "Chọn nhiều phương án", value: "CHECKBOX", icon: "❓" },
];

// const options = [
//   { label: "Câu trả lời ngắn", value: "short-answer", icon: "📝" },
//   { label: "File", value: "file", icon: "📂" },
//   { label: "Trắc nghiệm", value: "multiple-choice", icon: "❓" },
// ];
//Nhận giá trị từ cha
const props = defineProps(["type"]);
const emit = defineEmits(["update:type"]);
const selected = ref(props.type);

const selectedLabel = computed(() => {
  return (
    options.find((option) => option.value === selected.value)?.label ||
    "Chọn loại câu hỏi"
  );
});
// Thanh option sẽ hiện tùy theo giá trị selected của question active và gửi giá trị lên cha
const selectOption = (option) => {
  selected.value = option.value;
  emit("update:type", selected.value);
};
// Quan sát giá trị selected để cập nhật lại
watch(
  () => props.type,
  (newType) => {
    selected.value = newType;
  },
  { immediate: true }
);
</script>
