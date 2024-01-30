import { createRouter, createWebHistory } from "vue-router";
import MainDashboard from "../views/mainDashboard.vue";
import body from "../components/body.vue";
import CreateProgram from "../views/createProgram/createProject.vue";
import EditProgram from "../views/editProgram/EditProgram.vue";
import Login from "../views/Auth/login.vue";
import Signup from "../views/Auth/signup.vue";
import ResetPassword from "../views/Auth/resetPassword.vue";
import Activate from "../views/Auth/activate.vue";
import newPassword from "../views/Auth/newPassword.vue";
import ProgramList from "../views/ProgramList/programs.vue";
import Reports from "../views/reports.vue";
import ReportsIndex from "../views/Reports/ReportsIndex.vue"
import Payments from "../views/payment/Payments.vue";
import UsersList from "../views/users.vue"
import Vulns from "../views/vulns.vue"
import CompaniesList from "../views/companies.vue"
import ProgramDetail from "../views/ProgramDetail/mainProgram.vue";
import ReportDetail from "../views/Reports/ReportDetail.vue";
import { useCookies } from "vue3-cookies";
import userEdit from "../views/userEdit/userEdit.vue";
import userProfile from '../views/userProfile/userProfile.vue';

const { cookies } = useCookies();

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/recover",
      component: ResetPassword,
    },
    {
      path: "/activate/:token",
      name: "Activate",
      component: Activate,
    },
    {
      path: "/reset-password/:token",
      name: "ResetPassword",
      component: newPassword,
    },
    {
      path: "/app",
      component: body,
      meta: {
        parent: "/app"
      },
      children: [
        {
          path: "/app",
          name: "MainDashboard",
          component: MainDashboard,
        },
        {
          path: "/program/create",
          name: "CreateProgram",
          component: CreateProgram,
          meta: {
            parent: "/program/list"
          },
        },
        {
          path: "/program/list",
          name: "ProgramList",
          component: ProgramList,
          meta: {
            parent: "/program/list"
          },
        },
        {
          path: "/program/detail/:id",
          name: "ProgramDetail",
          component: ProgramDetail,
          meta: {
            parent: "/program/list"
          },
        },
        {
          path: "/program/edit/:id",
          name: "EditProgram",
          component: EditProgram,
          meta: {
            parent: "/program/list"
          },
        },
        {
          path: "/reports",
          name: "Reports",
          component: Reports,
          meta: {
            parent: "/reports/all"
          },
          children: [
            {
              path: "all",
              name: "ReportsIndex",
              component: ReportsIndex,
              children: [
                {
                  component: ReportDetail,
                  name: "report-detail",
                  path: "report/:id"
                }
              ]
            },
            {
              path: "triaged/",
              name: "ReportsTriaged",
              component: ReportsIndex,
              children: [
                {
                  path: "report/:id",
                  component: ReportDetail,
                  name: "report-triaged",
                }
              ]
            },
            {
              path: "duplicates/",
              name: "ReportsDuplicates",
              component: ReportsIndex,
              children: [
                {
                  path: "report/:id",
                  component: ReportDetail,
                  name: "report-duplicates",
                }
              ]
            },
            {
              path: "pending-review/",
              name: "ReportsPtReview",
              component: ReportsIndex,
              children: [
                {
                  path: "report/:id",
                  component: ReportDetail,
                  name: "report-ptReview",
                }
              ]
            },
            {
              path: "pending-pay/",
              name: "ReportsPtPay",
              component: ReportsIndex,
              children: [
                {
                  path: "report/:id",
                  component: ReportDetail,
                  name: "report-ptPay",
                }
              ]
            },
          ],
        },
        {
          path: "/usersList",
          name: "UsersList",
          component: UsersList,
          meta: {
            parent: "/usersList"
          },
        },
        {
          path: "/companiesList",
          name: "CompaniesList",
          component: CompaniesList,
          meta: {
            parent: "/companiesList"
          },
        },
        {
          path: "/payments",
          name: "Payments",
          component: Payments,
          meta: {
            parent: "/payments"
          },
        },
        {
          path: "/vulns",
          name: "Vulns",
          component: Vulns,
          meta: {
            parent: "/vulns"
          },
        },
        {
          path: '/users',

          children: [
            {
              path: 'edit',
              name: 'UserEdit',
              component: userEdit,
            },
            {
              path: 'profile',
              name: 'UserProfile',
              component: userProfile,
            }
          ]
        },
      ],
    },
  ],
});

let routePaths = [];

const extractAppRoutes = (routes, parentPath = '') => {
  routes.forEach((route) => {
    let path = route.path;
    path = path.replace(/\/:[^/]+/g, '');
    const fullPath = parentPath + (path.startsWith('/') ? path : '/' + path);
    routePaths.push(fullPath);
    if (route.children) {
      extractAppRoutes(route.children, fullPath);
    }
  });
};

const appRoute = router.options.routes.find((route) => route.path === '/app');
extractAppRoutes(appRoute.children);

router.beforeEach((to, from, next) => {

  const path = routePaths;
  if (!path.includes(to.path) || cookies.get("token_value")) {
    next();
  }
  next("/");
});
export default router;