export default [
  {
    path: '/',
    name: 'home.index',
    component: require('components/Home/index/Index')
  },
  {
    path: '*',
    redirect: '/'
  }
]
