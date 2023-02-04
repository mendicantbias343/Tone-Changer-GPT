<template>
  <div class="container mx-auto px-4 flex flex-row justify-center pt-16">
    <div class="mockup-window border bg-base-300 relative max-w-2xl">
      <div
        class="flex flex-col align-top justify-center place-items-start px-10 py-8 bg-base-200"
      >
        <div class="text-left">
          <span class="text-sm">
            Before you access the platform, please provide your email and
            password.
          </span>
        </div>
        <div
          class="flex flex-row px-10 py-10 bg-gray-400 mt-5 border shadow-md rounded-lg w-full gap-5"
        >
          <div class="w-1/3">
            <label class="swap swap-rotate cursor-default">
              <!-- this hidden checkbox controls the state -->
              <input type="checkbox" v-model="securitySwap" />

              <!-- sun icon -->
              <svg
                class="swap-off fill-current w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                  clip-rule="evenodd"
                />
              </svg>

              <!-- moon icon -->
              <svg
                class="swap-on fill-current w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div class="form-control flex flex-col justify-start">
            <label class="input-group">
              <span>Email</span>
              <input
                type="text"
                placeholder="info@site.com"
                class="input input-bordered"
                v-model="email"
              />
            </label>

            <label class="input-group mt-5">
              <span>Password</span>
              <input
                type="text"
                placeholder="hunter123"
                class="input input-bordered"
                v-model="password"
              />
            </label>
            <button @click="validateLogin" class="btn bg-lime-700 w-fit px-10 mt-5">Login</button>

            <!-- login error -->
           
          </div>
          
        </div>
        <div v-if="loginFailed" class="alert alert-error shadow-lg text-left ">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Incorrect email or password. Please connect with the admin for details.</span>
              </div>
            </div>
        <!-- main-form -->
      </div>

      <div
        class="absolute top-[.9rem] left-[7rem] font-bold text-primary-content"
      >
        Subject Line Variations
      </div>
    </div>
  </div>
  <footer class="mt-5 text-xs select-none text-slate-200">
    Made with ❤️ for XFS
  </footer>
</template>

<script>
export default {
  name: "Home",
  components: {},

  data() {
    return {
      securitySwap: "",
      email: "",
      password: "",
      loginFailed : false
    };
  },
  methods: {
    validateLogin(){
      if(this.securitySwap && !this.email && !this.password){
        
        localStorage.setItem("securityToken", Date.now() * 2)
        this.loginFailed = false
        this.$router.push('/about')
      }
      else{
        this.loginFailed = true
      }
    }
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.form-control input:checked ~ input {
  display: block;
}

.space_before {
  display: inline-block;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
