import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { ERouterName } from './type'
import CreateTextVideo from '../views/createTextVideo.vue'
import CreateAudioVideo from '../views/createAudioVideo.vue'
import DisplayList from '../views/displayListV2.vue'
import Login from '../views/login.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/create/text',
      name: ERouterName.createTextVideo,
      component: CreateTextVideo
    },
    {
      path: '/create/audio',
      name: ERouterName.createAudioVideo,
      component: CreateAudioVideo
    },
    {
      path: '/list',
      name: ERouterName.videoList,
      component: DisplayList
    },
    {
      path: '/login',
      name: ERouterName.login,
      component: Login
    }
  ]
})

export default router
