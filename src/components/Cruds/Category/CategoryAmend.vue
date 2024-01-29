<template>
  <div class="mx-2 mt-3 p-0">
    <div class="my-3 p-0">
      <page-title
        class="col-md-4 ml-2"
        :heading="$t('create_amend_category')"
        :google_icon="google_icon"
      ></page-title>
    </div>
    <div class="mb-3 mx-auto">
      <div class="card-body">
        <content-loader v-if="loader"></content-loader>
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
            <v-form ref="form" v-model="valid">
              <v-layout>
                <v-row class="px-6 mt-2">
                  <v-col cols="6" sm="6" md="6">
                    <v-tooltip :text="$t('name')" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-bind="props"
                          v-model="category.name"
                          :rules="fieldRules"
                          class="required_field"
                          maxlength="100"
                          v-bind:label="$t('name')"
                          required
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </template>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <v-tooltip :text="$t('title')" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-bind="props"
                          v-model="category.title"
                          :rules="fieldRules"
                          class="required_field"
                          maxlength="100"
                          v-bind:label="$t('title')"
                          required
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-layout>
              <v-layout>
                <v-row class="px-6 pt-0">
                  <v-col cols="12" md="12" lg="12" sm="12" class="pt-0">
                    <v-card-title class="text-left" style="font-size: 17px">{{
                      $t("description")
                    }}</v-card-title>
                    <v-tooltip :text="$t('description')" location="top">
                      <template v-slot:activator="{ props }">
                        <div v-bind="props">
                          <quill-editor
                            class="hide_quill_input"
                            v-bind:id="
                              quill_item == true
                                ? 'quill_item'
                                : 'quill_item_border'
                            "
                            v-model:value="category.description"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)"
                            @change="onEditorChange($event)"
                          />
                          <small
                            v-if="quill_item"
                            class="text-danger ml-5 required_item shake"
                            >Field Required</small
                          >
                        </div>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-layout>
              <v-layout>
                <v-row class="mt-2 px-6" max-width="344">
                  <v-col md="12">
                    <v-tooltip :text="this.$t('meta_title')" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-bind="props"
                          v-model="category.meta_title"
                          :rules="fieldRules"
                          class="required_field"
                          maxlength="150"
                          v-bind:label="$t('meta_title')"
                          required
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </template>
                    </v-tooltip>
                  </v-col>
                  <v-col md="12">
                    <v-tooltip
                      :text="this.$t('meta_description')"
                      location="bottom"
                    >
                      <template v-slot:activator="{ props }">
                        <v-textarea
                          v-on="on"
                          rows="2"
                          v-model="category.meta_description"
                          v-bind="props"
                          :rules="descriptionRules"
                          v-bind:label="$t('meta_description')"
                          required
                          class="required_field"
                          variant="outlined"
                          maxlength="250"
                          counter="true"
                        ></v-textarea>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-layout>
            </v-form>
          </v-window-item>
          <!-- ENGLISH TAB END -->
          <!-- ARABIC TAB STARTS -->
          <v-window-item :value="2">
            <v-form ref="form" v-model="valid">
              <v-layout>
                <v-row class="px-6 mt-2">
                  <v-col cols="6" sm="6" md="6">
                    <v-tooltip :text="$t('name_ar')" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-bind="props"
                          v-model="category.name_ar"
                          :rules="fieldRules"
                          class="required_field"
                          maxlength="100"
                          v-bind:label="$t('name_ar')"
                          required
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </template>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <v-tooltip :text="$t('title_ar')" location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-bind="props"
                          v-model="category.title_ar"
                          :rules="fieldRules"
                          class="required_field"
                          maxlength="100"
                          v-bind:label="$t('title_ar')"
                          required
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-layout>
              <v-layout>
                <v-row class="px-6 pt-0">
                  <v-col cols="12" md="12" lg="12" sm="12" class="pt-0">
                    <v-card-title class="text-left" style="font-size: 17px">{{
                      $t("description_ar")
                    }}</v-card-title>
                    <v-tooltip :text="$t('description_ar')" location="top">
                      <template v-slot:activator="{ props }">
                        <div v-bind="props">
                          <quill-editor
                            class="hide_quill_input"
                            v-bind:id="
                              quill_item == true
                                ? 'quill_item'
                                : 'quill_item_border'
                            "
                            v-model:value="category.description_ar"
                            @blur="onEditorBlurAR($event)"
                            @focus="onEditorFocusAR($event)"
                            @ready="onEditorReadyAR($event)"
                            @change="onEditorChangeAR($event)"
                          />
                          <small
                            v-if="quill_item"
                            class="text-danger ml-5 required_item shake"
                            >Field Required</small
                          >
                        </div>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-layout>
              <v-layout>
                <v-row class="mt-2 px-6" max-width="344">
                  <v-col md="12">
                    <v-tooltip
                      :text="this.$t('meta_title_ar')"
                      location="bottom"
                    >
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-bind="props"
                          v-model="category.meta_title_ar"
                          :rules="fieldRules"
                          class="required_field"
                          maxlength="150"
                          v-bind:label="$t('meta_title_ar')"
                          required
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </template>
                    </v-tooltip>
                  </v-col>
                  <v-col md="12">
                    <v-tooltip
                      :text="this.$t('meta_description_ar')"
                      location="bottom"
                    >
                      <template v-slot:activator="{ props }">
                        <v-textarea
                          v-on="on"
                          rows="2"
                          v-model="category.meta_description_ar"
                          v-bind="props"
                          :rules="descriptionRules"
                          v-bind:label="$t('meta_description_ar')"
                          required
                          class="required_field"
                          variant="outlined"
                          maxlength="250"
                          counter="true"
                        ></v-textarea>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-layout>
            </v-form>
          </v-window-item>
          <!-- ARABIC TAB END -->
        </v-window>
      </div>
      <v-layout>
        <v-row class="mt-2 px-6" max-width="344">
          <v-col md="6">
            <v-tooltip
              :text="this.$t('display_in_header_menu')"
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <v-switch
                  color="primary"
                  v-bind="props"
                  v-model="category.display_header_menu"
                  :model-value="
                    category.display_header_menu === 1 ? true : false
                  "
                  v-bind:label="$t('display_in_header_menu')"
                ></v-switch>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-layout>
      <div class="d-block mr-4 mt-3 text-right">
        <v-tooltip :text="this.$t('cancel')" location="bottom">
          <template v-slot:activator="{ props }">
            <div v-bind="props" class="d-inline-block mr-2">
              <router-link :to="{ name: 'category' }">
                <v-btn
                  v-bind="props"
                  size="small"
                  @click="$router.go(-1)"
                  :disabled="loading"
                  class="ma-1"
                  color="cancel"
                  >{{ $t("cancel") }}</v-btn
                >
              </router-link>
            </div>
          </template>
        </v-tooltip>
        <v-tooltip :text="this.$t('submit')" location="bottom">
          <template v-slot:activator="{ props }">
            <div v-bind="props" class="d-inline-block">
              <v-btn
                :disabled="isDisabled"
                @click="submit"
                size="small"
                class="mr-2"
                color="success"
              >
                {{ $t("submit") }}
                <v-progress-circular
                  v-if="isBtnLoading"
                  indeterminate
                  width="1"
                  color="cancel"
                  size="x-small"
                  class="ml-2"
                ></v-progress-circular>
              </v-btn>
            </div>
          </template>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>
    
  <script>
import PageTitle from "../../CustomComponents/PageTitle.vue";
import { quillEditor } from "vue3-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    PageTitle,
    quillEditor,
  },
  setup() {
    const onEditorFocus = (quill) => {
      console.log("editor focus!", quill);
    };
    const onEditorFocusAR = (quill) => {
      console.log("editor focus!", quill);
    };
    const onEditorReady = (quill) => {
      console.log("editor ready!", quill);
    };
    const onEditorReadyAR = (quill) => {
      console.log("editor ready!", quill);
    };

    return { onEditorReady, onEditorFocus, onEditorFocusAR, onEditorReadyAR };
  },
  data: () => ({
    google_icon: {
      icon_name: "edit_note",
      color: "google_icon_gradient",
      icon: "material-symbols-outlined",
    },
    valid: true,
    successmessage: "",
    message: "",
    valid_error: false,
    file: "",
    loading: false,
    isBtnLoading: false,
    isDisabled: false,
    loader: false,
    tabs: 1,
    category: {
      id: 0,
      name: "",
      name_ar: "",
      title: "",
      title_ar: "",
      description: "",
      description_ar: "",
      meta_title: "",
      meta_title_ar: "",
      meta_description: "",
      meta_description_ar: "",
      display_header_menu: "",
    },
  }),

  computed: {
    fieldRules() {
      return [(v) => !!v || this.$t("field_required")];
    },

    descriptionRules() {
      return [(v) => !!v || this.$t("description_required")];
    },
  },

  created() {},

  watch: {
    "$route.query.slug": {
      immediate: true,
      handler() {
        if (this.$route.query.slug) {
          this.loader = true;
          this.$axios
            .get(
              process.env.VUE_APP_API_URL_ADMIN +
                "edit-category/" +
                this.$route.query.slug
            )
            .then((res) => {
              if (Array.isArray(res.data.message)) {
                this.array_data = res.data.message.toString();
              } else {
                this.array_data = res.data.message;
              }
              if (res.data.status == "S") {
                this.category = res.data.category;
                this.loader = false;
              } else {
                this.$toast.error(this.$t("something_went_wrong"));
                this.loader = false;
              }
            })
            .catch((err) => {
              this.loader = false;
              this.$toast.error(this.$t("something_went_wrong"));
              console.log(err);
            });
        }
      },
    },
  },

  methods: {
    submit() {
      if (this.category.description == "") {
        this.quill_item = true;
      }
      if (this.category.description_ar == "") {
        this.quill_item_ar = true;
      }
      if (this.$refs.form.validate() && this.valid == true) {
        if (
          this.category.description == "" ||
          this.category.description_ar == ""
        ) {
          return;
        }
        this.isDisabled = true;
        this.isBtnLoading = true;
        // Form is valid, process
        this.$axios
          .post(
            process.env.VUE_APP_API_URL_ADMIN + "save-category",
            this.category
          )
          .then((res) => {
            this.btnloading = false;
            if (Array.isArray(res.data.message)) {
              this.array_data = res.data.message.toString();
            } else {
              this.array_data = res.data.message;
            }
            if (res.data.status == "S") {
              this.$toast.success(this.array_data);
              this.message = res.data.message;
              this.$router.push({
                name: "category",
              });
            } else {
              this.$toast.error(this.array_data);
            }
          })
          .catch((err) => {
            this.isDisabled = false;
            this.isBtnLoading = false;
            this.$toast.error(this.$t("something_went_wrong"));
            console.log("error", err);
          });
        this.isDisabled = false;
        this.isBtnLoading = false;
      }
    },
    onEditorChange(event) {
      if (event.text.length == 1) {
        this.quill_item = true;
      } else {
        this.quill_item = false;
      }
    },
    onEditorChangeAR(event) {
      if (event.text.length == 1) {
        this.quill_item = true;
      } else {
        this.quill_item = false;
      }
    },
    onEditorBlur(event) {
      console.log(event.options);
      if (this.category.description == "") {
        this.quill_item = true;
      }
    },
    onEditorBlurAR(event) {
      console.log(event.options);
      if (this.category.description_ar == "") {
        this.quill_item = true;
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
  <style scoped>
#quill_item {
  border: 1px solid #b00020;
}
#quill_item_border {
  border: 1px solid #d1d5db;
}
</style>
    