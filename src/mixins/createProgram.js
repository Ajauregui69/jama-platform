export default {
  data() {
    return {
      errors: [],
      formSubmitted: false,
      programTitle: "",
      programImage: "",
      requirements: "",
      outofScope: "",
      programDescription: "",
      programAsset: ""
    };
  },
  methods: {
    onCustomStyleSubmit() {
      this.formSubmitted = true;
      this.errors = [];
      if (this.programTitle.length < 3 || this.programTitle > 10) {
        this.firstError = true;

        this.errors.push({});
      } else {
        this.firstError = false;
        this.errors.push({
          message: "Look good!",
        });
      }
      if (this.lastname.length < 3 || this.lastname.length > 10) {
        this.lastError = true;
        this.errors.push({});
      } else {
        this.lastError = false;
        this.errors.push({
          message: "Look good!",
        });
      }
      if (this.username.length < 3 || this.username.length > 6) {
        this.userError = true;
        this.errors.push({
          message1: "Please choose a username.",
        });
      } else {
        this.userError = false;
      }
      if (this.city.length < 3 || this.city.length > 10) {
        this.cityError = true;
        this.errors.push({
          message2: "Please provide a valid city.",
        });
      } else {
        this.cityError = false;
      }

      if (this.state.length > 7) {
        this.stateError = true;
        this.errors.push({
          message3: "Please select a valid state.",
        });
      } else {
        this.stateError = false;
      }
      if (this.zip < 8) {
        this.zipError = true;
        this.errors.push({
          message4: "Please provide a valid zip.",
        });
      } else {
        this.zipError = false;
      }
    },
  },
};
