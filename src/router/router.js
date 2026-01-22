import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/upload",
    component: () => import("@/views/FileUploaderView.vue"),
    name: "upload",
  },
  {
    path: "/files",
    component: () => import("@/views/FileListView.vue"),
    name: "files",
  },
  {
    path: "/",
    redirect: { name: "upload" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
