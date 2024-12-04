<template>
  <div class="p-4 mt-10">
    <div class="mb-2 text-lg font-semibold">Trang chủ</div>
    <h5 class="mb-3 text-xl font-bold">Quản lí muợn sách</h5>
    <div class="flex justify-between mb-4">
      <div class="flex">
        <input
          placeholder="Nhập thông tin cần tìm"
          v-model="query"
          class="outline-none w-60 p-2 border-2 border-gray-500 rounded-l-lg"
        />
        <span class="p-2 bg-blue-500 text-white rounded-r-lg">
          <font-awesome-icon :icon="faSearch" />
        </span>
      </div>
      <!-- <router-link :to="{ name: 'book:create' }" class="no-underline">
        <div class="bg-blue-500 p-2 text-white rounded-lg text-center no-underline">
          <font-awesome-icon :icon="faUserPlus" />
          Tạo sách
        </div>
      </router-link> -->
    </div>
    <div>
      <template v-if="!filteredData.length">
        <div>Không có người mượn nào</div>
      </template>
      <template v-else>
        <table class="min-w-full border-collapse block md:table">
          <thead class="block md:table-header-group">
            <tr
              class="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative"
            >
              <th
                v-for="column in columns"
                :key="column.key"
                class="bg-gray-200 p-2 text-gray-600 font-bold block md:table-cell"
              >
                {{ column.title }}
              </th>
              <th class="bg-gray-200 p-2 text-gray-600 font-bold block md:table-cell">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody class="block md:table-row-group">
            <tr
              v-for="row in filteredData"
              :key="row.id"
              class="bg-gray-100 border border-gray-300 md:border-none block md:table-row"
            >
              <td
                v-for="column in columns"
                :key="column.key"
                class="p-2 text-gray-800 block md:table-cell"
              >
                {{ renderCell(row, column) }}
              </td>
              <td class="p-2 text-gray-800 block md:table-cell">
                <div class="flex items-center gap-2">
                  <select
                    :value="row.status"
                    @change="(e) => updateBorrowStatus(row._id, e.target.value)"
                    :class="getStatusClass(row.status)"
                    class="border rounded px-2 py-1 outline-none"
                    :disabled="!canChangeStatus(row.status)"
                  >
                    <option
                      v-for="status in availableStatuses(row)"
                      :key="status"
                      :value="status"
                      :class="getStatusClass(status)"
                    >
                      {{ getStatusText(status) }}
                    </option>
                  </select>
                  <button class="p-2 bg-slate-500 rounded-lg" @click="navigateToBorrow">
                    Update
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useBorrowStore } from "../../stores/borrow";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const router = useRouter();
const borrowStore = useBorrowStore();
const query = ref("");

// Định nghĩa enum status nếu chưa có
enum BorrowStatus {
  PENDING = "pending",
  APPROVED = "approved",
  RETURNED = "returned",
  REJECTED = "rejected",
}

const columns = [
  { title: "Tên username", dataIndex: "user.username", key: "user._id" },
  { title: "Tên sách", dataIndex: "book.name", key: "book" },
  { title: "Ngày mượn", dataIndex: "borrowedDay", key: "borrowedDay" },
  { title: "Hạn trả", dataIndex: "estimatedReturnDate", key: "estimatedReturnDate" },
  { title: "Ngày đã trả", dataIndex: "actualReturnDate", key: "actualReturnDate" },
];

const fetchBorrow = async () => {
  try {
    await borrowStore.getAllBorrows();
    // location.replace("http://localhost:5173/borrow");
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(fetchBorrow);

const filteredData = computed(() => {
  if (!query.value) {
    return borrowStore.allBorrow;
  }
  const searchQuery = query.value.toLowerCase();
  return borrowStore.allBorrow.filter((item: any) => {
    // Access the nested properties safely
    const bookName = item.book?.name?.toLowerCase() || "";
    const username = item.user?.username?.toLowerCase() || "";

    // Check if either the book name or the username matches the search query
    return bookName.includes(searchQuery) || username.includes(searchQuery);
  });
});

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const renderCell = (row: any, column: any) => {
  const keys = column.dataIndex.split(".");
  let value = row;
  try {
    keys.forEach((key: any) => {
      value = value[key];
    });
    if (["borrowedDay", "estimatedReturnDate", "actualReturnDate"].includes(column.key)) {
      return formatDate(value);
    }
  } catch (error) {
    console.error("Error accessing value for column:", column, "row:", row);
    value = ""; // Hoặc giá trị mặc định nào đó nếu cần thiết
  }
  return value !== undefined && value !== null ? value : "";
};

// Kiểm tra xem có thể thay đổi trạng thái không
const canChangeStatus = (status: BorrowStatus) => {
  return ![BorrowStatus.RETURNED, BorrowStatus.REJECTED].includes(status);
};

// Hàm lấy danh sách trạng thái có thể chuyển đổi
const availableStatuses = (borrow: any) => {
  switch (borrow.status) {
    case BorrowStatus.PENDING:
      return [BorrowStatus.PENDING, BorrowStatus.APPROVED, BorrowStatus.REJECTED];
    case BorrowStatus.APPROVED:
      return [BorrowStatus.APPROVED, BorrowStatus.RETURNED];
    case BorrowStatus.RETURNED:
      return [borrow.status];
    case BorrowStatus.REJECTED:
      return [borrow.status]; // Không cho phép thay đổi nếu đã trả hoặc từ chối
    default:
      return [BorrowStatus.PENDING];
  }
};

// Hàm lấy text hiển thị cho từng status
const getStatusText = (status: BorrowStatus) => {
  const statusMap = {
    [BorrowStatus.PENDING]: "Đang chờ duyệt",
    [BorrowStatus.APPROVED]: "Đã duyệt",
    [BorrowStatus.RETURNED]: "Đã trả sách",
    [BorrowStatus.REJECTED]: "Đã từ chối",
  };
  return statusMap[status] || status;
};

// Hàm lấy class cho từng status
const getStatusClass = (status: BorrowStatus) => {
  const statusClasses = {
    [BorrowStatus.PENDING]: "bg-yellow-50 text-yellow-600",
    [BorrowStatus.APPROVED]: "bg-green-50 text-green-600",
    [BorrowStatus.RETURNED]: "bg-blue-50 text-blue-600",
    [BorrowStatus.REJECTED]: "bg-red-50 text-red-600",
  };
  return statusClasses[status] || "";
};

// Hàm xử lý cập nhật trạng thái
const updateBorrowStatus = async (borrowId: string, newStatus: BorrowStatus) => {
  try {
    const actionText = {
      [BorrowStatus.APPROVED]: "duyệt",
      [BorrowStatus.REJECTED]: "từ chối",
      [BorrowStatus.RETURNED]: "Da trả",
    }[newStatus];

    const confirmed = confirm(`Xác nhận ${actionText} yêu cầu mượn sách này?`);
    if (confirmed) {
      await borrowStore.updateBorrowStatus(borrowId, newStatus);
      alert(`Cập nhật trạng thái thành công`);

      await fetchBorrow();
    }
    location.replace("http://localhost:5173/borrow");
  } catch (error) {
    console.error("Error updating borrow status:", error);
    alert("Cập nhật trạng thái thất bại");
  }
};

const navigateToBorrow = () => {
  location.replace("http://localhost:5173/borrow");
};

// const editBook = (book: any) => {
//   router.push({ name: "book:edit", params: { id: book._id } });
// };

// const deleteBook = async (book: any) => {
//   const confirmed = confirm(`Bạn có chắc chắn muốn xóa sách ${book.name}?`);
//   if (confirmed) {
//     try {
//       await borrowStore.deleteBook(book._id);
//       alert("Xóa sách thành công");
//       await fetchBorrow();
//     } catch (error) {
//       console.error("Error deleting book:", error);
//       alert("Xóa sách thất bại");
//     }
//   }
// };
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}

select {
  @apply appearance-none cursor-pointer;
  background-image: url("data:image/svg+xml,..."); /* Thêm icon dropdown */
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-right: 2rem;
}

select option {
  @apply py-1;
}

/* Màu nền cho các option khi hover */
select option:hover {
  @apply bg-gray-100;
}
</style>
