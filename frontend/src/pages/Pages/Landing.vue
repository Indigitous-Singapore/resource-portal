<template>
<q-page>
  <section id="banner" class="q-py-xl">
    <div id="banner-overlay" class="" />
    <div id="banner-content" class="container">
      <div class="row">
        <div class="column col-12 col-md-8 col-lg-7 q-pr-lg">
          <h1 class="text-h2 text-weight-medium text-white">Equipping Worship Servants for His Glory</h1>
          <p class="text-h5 text-white q-mb-xl">Bringing local &amp; regional worship resources to worship leaders, musicians and the church</p>
          <div class="row">
            <q-btn
              id="sign-up"
              class="q-py-xs"
              rounded
              unelevated
              color="accent"
              label="SIGN UP"
              to="/register"
              />
            <q-btn
              id="learn-more"
              class="q-py-xs q-mx-none"
              rounded
              flat
              color="white"
            >
              <router-link
                class="no-decoration text-white"
                exact
                to="/about"
                >
                LEARN MORE
              </router-link>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="q-py-xl text-center">
    <div class="container">
      <div class="row">
        <div class="column col-12">
          <h2 class="text-h4">Sharing the Best Worship Resources</h2>
          <h4 class="text-h6 text-grey-8">Download free ministry resources for your church</h4>
        </div>
      </div>
      <div class="row q-mt-md">
        <div id="row-or-column" class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 justify-between">
          <div class="category column items-center">
            <q-img
              class="q-my-lg"
              :ratio="1/1"
              src="assets/songs-color.svg"
              />
            <p>Songs</p>
          </div>
          <div class="category column items-center">
            <q-img
              class="q-my-lg"
              :ratio="1/1"
              src="assets/prayers-color.svg"
              />
            <p>Prayers</p>
          </div>
          <div class="category column items-center">
            <q-img
              class="q-my-lg"
              :ratio="1/1"
              src="assets/skills-training-color.svg"
              />
            <p>Skills Training</p>
          </div>
          <div class="category column items-center">
            <q-img
              class="q-my-lg"
              :ratio="1/1"
              src="assets/training-resources-color.svg"
              />
            <p>Teaching Resources</p>
          </div>
          <div class="category column items-center">
            <q-img
              class="q-my-lg"
              :ratio="1/1"
              src="assets/lithurgies-color.svg"
              />
            <p>Liturgies</p>
          </div>
        </div>
      </div>
      <div class="row q-mt-xl">
        <div class="col-12 align-center">
          <q-btn
            outline
            rounded
            class="q-px-lg q-py-xs text-bold"
            label="EXPLORE"
            to="/explore"
            />
        </div>
      </div>
    </div>
  </section>
</q-page>
</template>

<style scoped lang="scss">
h1 {
  @media screen and (max-width: 599px){
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 3rem;
  }
}
#banner {
  position: relative;
  background-size: cover;
  background-position: center center;
  background-image: url("/assets/home-banner.jpg");
}
#banner-overlay {
  background-color: rgba(50,50,50, 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
#banner-content {
  position: relative;
  z-index: 1;
}
#sign-up, #learn-more {
  padding-left: 2.5em;
  padding-right: 2.5em;

  @media screen and (max-width: 599px){
    padding-left: 1.8em;
    padding-right: 1.8em;
  }
}
#row-or-column {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
}
.category {
  width: 150px;

  .q-img {
    height: 70px;
    width: 70px;
  }
}
</style>
