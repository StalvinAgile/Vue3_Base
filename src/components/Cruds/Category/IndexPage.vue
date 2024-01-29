<template>
  <div class="main-20">
    <div flat color="white" class="row py-5 pl-5 align-items-center">
      <page-title
        class="col-md-3"
        :heading="$t('category')"
        :google_icon="google_icon"
      ></page-title>

      <div class="col-md-4">
        <v-tooltip :text="this.$t('search')" location="top">
          <template v-slot:activator="{ props }">
            <v-text-field
              dense
              density="compact"
              v-on="on"
              variant="outlined"
              v-model="search"
              append-icon="search"
              label="Search"
              class="srch_bar"
              small
              hide-details
              v-bind="props"
            ></v-text-field>
          </template>
        </v-tooltip>
      </div>

      <div class="add_new_button">
        <v-tooltip :text="this.$t('add_new')" location="bottom">
          <template v-slot:activator="{ props }">
            <router-link :to="{ name: 'category-amend' }" style="color: white">
              <v-btn size="small" class="mb-2 green_btn_color" v-bind="props">{{
                $t("add_new")
              }}</v-btn>
            </router-link>
          </template>
        </v-tooltip>
      </div>
    </div>

    <v-tabs v-model="tabs" color="blue">
      <v-tab :value="1">
        <span>{{ $t("english") }}</span>
      </v-tab>

      <v-tab :value="2">
        <span>{{ $t("arabic") }}</span>
      </v-tab>
    </v-tabs>

    <v-window v-model="tabs">
      <!-- ENGLISH TAB STARTS -->
      <v-window-item :value="1">
        <v-data-table
          :headers="headers"
          :items="categories"
          :search="search"
          :loading="initval"
          v-bind:no-data-text="$t('no_data_available')"
          :footer-props="{
            'items-per-page-text': $t('rows_per_page'),
          }"
        >
          <template v-slot:item="props">
            <tr class="vdatatable_tbody">
              <td>{{ props.item.selectable.name }}</td>
              <td>{{ props.item.selectable.title }}</td>
              <td>
                <v-btn
                  class="hover_shine btn mr-2"
                  :disabled="isDisabled"
                  @click="updateStatus(props.item.selectable.id)"
                  size="small"
                  v-bind:color="[
                    props.item.selectable.status == 1 ? 'success' : 'warning',
                  ]"
                >
                  <span
                    v-if="props.item.selectable.status == 1"
                    class="spanactivesize"
                    >{{ $t("active") }}</span
                  >
                  <span
                    v-if="props.item.selectable.status == 0"
                    class="spanactivesize"
                    >{{ $t("inactive") }}</span
                  >
                </v-btn>
              </td>
              <td class="text-center">
                <router-link
                  small
                  :to="{
                    name: 'category-amend',
                    query: { slug: props.item.selectable.slug },
                  }"
                >
                  <v-tooltip :text="this.$t('edit')" location="top">
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        small
                        class="mr-2 edit_btn icon_size"
                        >mdi-pencil-outline</v-icon
                      >
                    </template>
                    <span>{{ $t("edit") }}</span>
                  </v-tooltip>
                </router-link>
                <span @click="deleteItem(props.item.selectable.id)">
                  <v-tooltip :text="this.$t('delete')" location="top">
                    <template v-slot:activator="{ props }">
                      <v-icon color="error" type="button" v-bind="props" small
                        >mdi-trash-can-outline</v-icon
                      >
                    </template>
                    <span>{{ $t("delete") }}</span>
                  </v-tooltip>
                </span>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-window-item>
      <!-- ENGLISH TAB END -->
      <!-- ARABIC TAB STARTS -->
      <v-window-item :value="2">
        <v-data-table
          :headers="headers_ar"
          :items="categories"
          :search="search"
          class="rtl-direction"
          :loading="initval"
          v-bind:no-data-text="$t('no_data_available')"
          :footer-props="{
            'items-per-page-text': $t('rows_per_page'),
          }"
        >
          <template v-slot:item="props">
            <tr class="vdatatable_tbody">
              <td>{{ props.item.selectable.name_ar }}</td>
              <td>{{ props.item.selectable.title_ar }}</td>
              <td>
                <v-btn
                  class="hover_shine btn mr-2"
                  :disabled="isDisabled"
                  @click="updateStatus(props.item.selectable.id)"
                  size="small"
                  v-bind:color="[
                    props.item.selectable.status == 1 ? 'success' : 'warning',
                  ]"
                >
                  <span
                    v-if="props.item.selectable.status == 1"
                    class="spanactivesize"
                    >{{ $t("active_ar") }}</span
                  >
                  <span
                    v-if="props.item.selectable.status == 0"
                    class="spanactivesize"
                    >{{ $t("inactive_ar") }}</span
                  >
                </v-btn>
              </td>
              <td class="text-center">
                <router-link
                  small
                  :to="{
                    name: 'category-amend',
                    query: { slug: props.item.selectable.slug },
                  }"
                >
                  <v-tooltip :text="this.$t('edit')" location="top">
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        small
                        class="mr-2 edit_btn icon_size"
                        >mdi-pencil-outline</v-icon
                      >
                    </template>
                    <span>{{ $t("edit") }}</span>
                  </v-tooltip>
                </router-link>
                <span @click="deleteItem(props.item.selectable.id)">
                  <v-tooltip :text="this.$t('delete')" location="top">
                    <template v-slot:activator="{ props }">
                      <v-icon color="error" type="button" v-bind="props" small
                        >mdi-trash-can-outline</v-icon
                      >
                    </template>
                    <span>{{ $t("delete") }}</span>
                  </v-tooltip>
                </span>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-window-item>
      <!-- ARABIC TAB END -->
    </v-window>
    <ConfirmDialog
      :show="showConfirmDialog"
      :cancel="cancel"
      :confirm="confirm"
      :id="delete_id"
      v-bind:title="$t('confirm')"
      v-bind:description="$t('delete_confirmation')"
    />
    <ConfirmDialog
      :show="showStatusDialog"
      :cancel="cancelStatus"
      :confirm="confirmStatus"
      v-bind:title="$t('confirm')"
      v-bind:description="$t('status_change')"
    />
  </div>
</template>
    
  <script>
import PageTitle from "../../CustomComponents/PageTitle.vue";
import ConfirmDialog from "../../CustomComponents/ConfirmDialog.vue";
export default {
  components: { PageTitle, ConfirmDialog },
  data: () => ({
    search: "",
    showConfirmDialog: false,
    delete_id: null,
    dialog: false,
    categories: [],
    initval: true,
    google_icon: {
      icon_name: "apps",
      color: "google_icon_gradient",
      icon: "material-symbols-outlined",
    },
    status_id: null,
    showStatusDialog: false,
    tabs: 1,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    headers() {
      return [
        {
          title: this.$t("name"),
          key: "name",
        },
        {
          title: this.$t("title"),
          key: "title",
        },
        {
          title: this.$t("status"),
          key: "status",
        },
        {
          title: this.$t("action"),
          align: "center",
          key: "email",
        },
      ];
    },
    headers_ar() {
      return [
        {
          title: this.$t("name_ar"),
          key: "name_ar",
        },
        {
          title: this.$t("title_ar"),
          key: "title_ar",
        },
        {
          title: this.$t("status_ar"),
          key: "status",
        },
        {
          title: this.$t("action_ar"),
          align: "center",
        },
      ];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {},
  mounted() {
    this.fetchCategory();
  },

  methods: {
    cancel() {
      this.showConfirmDialog = false;
    },
    confirm(id) {
      this.deleteConfirm(id);
      this.showConfirmDialog = false;
    },

    fetchCategory() {
      this.initval = true;
      this.$axios
        .get(process.env.VUE_APP_API_URL_ADMIN + "fetch-category")
        .then((res) => {
          this.categories = res.data.categories;
          this.initval = false;
        })
        .catch((err) => {
          this.$toast.error(this.$t("something_went_wrong"));
          this.initval = false;
          console.log(err);
        });
    },

    deleteItem(time_id) {
      this.delete_id = time_id;
      this.showConfirmDialog = true;
    },

    deleteConfirm(time_id) {
      this.$axios
        .post(process.env.VUE_APP_API_URL_ADMIN + "delete-category/" + time_id)
        .then((res) => {
          if (Array.isArray(res.data.message)) {
            this.array_data = res.data.message.toString();
          } else {
            this.array_data = res.data.message;
          }
          if (res.data.status == "E") {
            this.$toast.error(this.array_data);
          } else {
            this.$toast.success(this.array_data);
            this.fetchCategory();
          }
        })
        .catch((err) => {
          this.$toast.error(this.$t("something_went_wrong"));
          console.log("this error" + err);
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    updateStatus(id) {
      this.status_id = id;
      this.showStatusDialog = true;
    },
    confirmStatus() {
      this.statusUpdate();
      this.showStatusDialog = false;
    },
    cancelStatus() {
      this.showStatusDialog = false;
    },
    statusUpdate() {
      this.loader = true;
      this.$axios
        .post(process.env.VUE_APP_API_URL_ADMIN + "update-category", {
          id: this.status_id,
        })
        .then((res) => {
          if (Array.isArray(res.data.message)) {
            this.array_data = res.data.message.toString();
          } else {
            this.array_data = res.data.message;
          }
          if (res.data.status == "S") {
            this.$toast.success(this.array_data);
            this.fetchCategory();
          } else if (res.data.status == "E") {
            this.$toast.error(this.array_data);
          } else {
            this.$toast.error(this.array_data);
            this.fetchCategory();
          }
        })
        .catch((err) => {
          this.$toast.error(this.array_data);
          console.log("this error" + err);
        });
      this.loader = false;
    },
  },
};
</script>
  <style scoped>
.list_item {
  cursor: pointer;
}
</style>