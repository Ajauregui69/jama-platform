export default {
    
    methods: {
      getImageUrl(path) {
        if(path)
        return 'src/assets/images/'+path
        else
        return ''
      },

    },
  }