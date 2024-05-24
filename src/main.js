import { createApp, defineAsyncComponent } from "vue";
import router from "./router.js";
import App from "./App.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseForm from "./components/ui/BaseForm.vue";
import BaseFormItem from "./components/ui/BaseFormItem.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import store from "./store/store.js";
const app = createApp(App);

const BaseDialog = defineAsyncComponent(() =>
  import("./components/ui/BaseDialog.vue")
);

app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);
app.component("BaseBadge", BaseBadge);
app.component("BaseForm", BaseForm);
app.component("BaseFormItem", BaseFormItem);
app.component("BaseSpinner", BaseSpinner);
app.component("BaseDialog", BaseDialog);

app.use(router);
app.use(store);

app.mount("#app");
