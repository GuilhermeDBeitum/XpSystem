<template>
  <v-container>
    <v-dialog width="500px" v-model="imgDialog">
      <v-card>
        <v-col cols="12" md="12">
          <v-img :src="this.$store.state.modinfo.img" @click="dialog = true">
            <div class="middle">
              <span class="ctr"> </span></div
          ></v-img>
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "MImg",
      loading: false,
      search: "",
      imgsrc: {},
    };
  },

  computed: {
    imgDialog: {
      get() {
        return this.$store.state.modinfo.imgDialog;
      },

      set(newImgDialog) {
        this.$store.commit("SET_IMGDIALOG", newImgDialog);
      },
    },
  },
};
</script>

<style scoped>
.ctr {
  margin: 40px;
  color: white;
  font-weight: 1120px;
  display: inline-block;
  border-radius: 11px;
  box-shadow: 0 35px 25px rgba(0, 0, 0, 0.2);
}

.media-post {
  margin-top: 1px;
  display: block;
  padding: 2px;
  border-radius: 8px;
  box-shadow: 0 25px 1px rgba(0, 0, 0, 0.2);
  background: black;
  text-align: center;
  text-align-last: center;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  background-color: rgba(0, 8, 0, 0.7);
  font-size: 14px;
  text-align: center;
  text-align-last: center;
  height: 150px;
}

.dw {
  transition: 0.5s ease;
  position: absolute;
  top: 250%;
  left: 100%;
}

.box:hover .image {
  opacity: 0.3;
}

.box:hover .middle {
  opacity: 1;
}

.front {
  z-index: 100;
  margin: 540px;
}

@media (max-width: 600px) {
  .ctr {
    margin-top: 100px;
    color: white;
    display: inline-block;
    border-radius: 11px;
    box-shadow: 0 35px 25px rgba(0, 0, 0, 0.2);
  }

  .media-post {
    margin-top: 1px;
    display: block;
    padding: 2px;
    border-radius: 8px;
    box-shadow: 0 25px 1px rgba(0, 0, 0, 0.2);
    background: black;
    text-align: center;
    text-align-last: center;
    margin-left: 30px;
  }

  .middle {
    transition: 0.5s ease;
    opacity: 0;
    background-color: rgba(0, 8, 0, 0.7);
    font-size: 14px;
    text-align: center;
    text-align-last: center;
    height: 250px;
  }
  .btns {
    text-align: center;
    margin-left: 30px;
    margin-bottom: 20px;
    width: 20;
  }
}

@media (max-width: 280px) {
  .ctr {
    margin: 40px;
    color: white;
    font-weight: 1120px;
    display: inline-block;
    border-radius: 11px;
    box-shadow: 0 35px 25px rgba(0, 0, 0, 0.2);
  }

  .media-post {
    margin-top: 1px;
    display: block;
    padding: 2px;
    border-radius: 8px;
    box-shadow: 0 25px 1px rgba(0, 0, 0, 0.2);
    background: black;
    text-align: center;
    text-align-last: center;
  }

  .middle {
    transition: 0.5s ease;
    opacity: 0;
    background-color: rgba(0, 8, 0, 0.7);
    font-size: 14px;
    text-align: center;
    text-align-last: center;
    height: 150px;
  }
  .btns {
    text-align: center;
    margin-left: 0px;
  }
}
</style>
