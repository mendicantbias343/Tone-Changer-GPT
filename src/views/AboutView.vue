<template>
  <div class="container mx-auto px-4 flex flex-row justify-center pt-16">
    <div class="mockup-window border bg-base-300 relative max-w-2xl">
      <div
        class="flex flex-col align-top justify-start place-items-start px-10 py-8 bg-base-200"
      >
        <div class="text-left">
          <span class="text-sm">
            Change the tone of your text to better suite the environment you'll
            be saying it in. Character limitation is <b>280 chars</b>.
          </span>

          <span v-if="dailyCountReached">
            Sorry, the daily count has been reached. Please try tomorrow or you
            can copy paste the output into ChatGPT and get the results yourself.
          </span>
        </div>
        <!-- main-form -->

        <div class="form-holder form flex flex-row mt-7 flex-grow gap-8 w-full">
          <!-- left col -->
          <div class="left-side flex flex-col flex-grow text-left">
            <h3 class="text-lg bg-green-500 w-fit px-1">Main Info:</h3>

            <div class="form-control w-full">
              <label class="label gap-2">
                <span class="label-text">Input sentence</span>
                <span class="label-text-alt"
                  ><b>{{
                    max - mainText.length > 0 ? max - mainText.length : 0
                  }}</b>
                  chars left</span
                >
              </label>
              <textarea
                class="textarea textarea-bordered min-h-[8rem]"
                placeholder="Description"
                v-model="mainText"
                :maxlength="max"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- right col -->
        <div class="right-side flex flex-col flex-grow mt-5">
          <h3 class="text-lg bg-green-500 w-fit px-1">Intended Tone:</h3>
          <select v-model="intendedChoice" class="select w-full max-w-xs mt-5">
            <option disabled selected class="text-black">
              Choose your tone
            </option>
            <option>Serious, Professional Tone</option>
            <option>Semi-Professional, But Official tone</option>
            <option>Casual, Friendly and Conversational Tone</option>
            <option>Pirate Tone</option>
          </select>
        </div>
        <div class="flex flex-row justify-center w-full mt-10">
          <button class="btn btn-wide btn-primary" @click="generateInputText">
            <b v-if="isLoading">Loading...</b>
            <b v-else>Change the tone</b>
          </button>
        </div>

        <!-- output -->
        <div class="flex flex-col flex-grow w-full mt-7 basis-full">
          <h3 class="text-lg bg-green-500 w-fit px-1">Output:</h3>
          <div
            class="finalContent p-5 bg-base-100 border border-primary mt-5 min-w-full rounded-md whitespace-pre-wrap text-left px-5"
          >
            {{ fStatement }}
          </div>
        </div>
      </div>

      <div
        class="absolute top-[.9rem] left-[7rem] font-bold text-primary-content"
      >
        Tone Changer (Powered by 🤖 ChatGPT )
      </div>
    </div>
  </div>
  <footer class="mt-5 text-xs select-none text-white">
    Made with ❤️ by <a href="https://rkakodker.com">Rameez Kakodker</a>
  </footer>
</template>

<script>
export default {
  name: "AboutView",
  components: {},

  data() {
    return {
      max: 280,
      mainText: "",
      intendedChoice: "",

      fStatement: "",
      dailyCountReached: false,
      isLoading: false,
      rootURI: "https://tonechangerapi.vercel.app",
    };
  },
  methods: {
    async isAvailableForPlay() {
      let resp = await fetch(this.rootURI + "/api/checklimit").catch((err) => {
        console.log("Fire! : " + err);
      });

      let output = resp.bodyContent;
      this.dailyCountReached = output == "limitreached" ? true : false;
      //this.dailyCountReached = true;
    },

    async generateInputText() {
      this.isLoading = true;
      //screwed up the radios :(
      let targetTone = "Rewrite the below sentenace in a ";
      if (this.intendedChoice == "Serious, Professional Tone") {
        targetTone += "serious, professional official tone";
      } else if (
        this.intendedChoice == "Semi-Professional, But Official Tone"
      ) {
        targetTone += "semi-professional, but official tone";
      } else if (
        this.intendedChoice == "Casual, Friendly and Conversational Tone"
      ) {
        targetTone += "casual, friendly and conversational tone";
      } else if (this.intendedChoice == "Pirate Tone") {
        targetTone += "pirate tone";
      } else {
        this.isLoading = false;
        this.fStatement = "Invalid input";
        return;
      }

      //convert the input:
      let output =
        targetTone +
        ". Limit the response to a max of 280 chars. This is the sentence: \n" +
        this.mainText;
      if (!this.dailyCountReached && this.mainText && this.intendedChoice) {
        let headersList = {
          Accept: "*/*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          params: output,
          intendedTone: targetTone.substring(33, targetTone.length),
        });

        let response = await fetch(this.rootURI + "/api/call-openai", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }).catch((error) => {
          console.error("Panic at the disco:", error);
          this.fStatement = error;
          this.loading = false;
        });
        let data = await response.json();
        console.log(data);
        this.fStatement = data[0].text.substring(2, data[0].text.length).trim();
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.fStatement = output;
      }
    },
  },
  beforeMount() {
    this.isAvailableForPlay();
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
