<template>
    <div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
              <div class="card-header">
                <h5 class="card-title">Proof of concept</h5>
              </div>
                <div class="card-body">
                  <div class="mb-2">
                    <label class="col-form-label">The proof of concept is the most important part of your report submission. Clear, <br> reproducible steps will help us validate this issue as quickly as possible.</label>
                </div>
                  <label class="form-label" for="exampleFormControlInput1">Report title</label>
                  <input class="form-control" id="exampleFormControlInput1" type="text" placeholder="Title">
                </div>
              <div class="card-body">
                <label class="col-form-label">Description</label>
                <ClientOnly>
                  <ckeditor :editor="editor"  v-model="editorDataDes"></ckeditor>
                </ClientOnly> 
              </div>
              <div class="card-body">
                <label class="col-form-label">Impact</label>
                <ClientOnly>
                  <ckeditor :editor="editor"  v-model="editorDataImp"></ckeditor>
                </ClientOnly> 
              </div>
          </div>
  
        </div>
    </div>
    <!-- Container-fluid Ends-->
    </div>
  </template>
  
  <script>
  // Import the editor
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  
    export default {
    
      components: {
        ckeditor: CKEditor.component
        },
      data() {
        return {
          editor: ClassicEditor,
          editorDataDes: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',
          editorDataImp: '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',

        };
      }
    };
  </script>
  
  
  <style>
   .ck-content { height:500px; }
  </style>