/*=========================================================================================
    
==========================================================================================*/
// Initialize Firebase

(function(window, document, $) {
    'use strict';
    $(document).ready(function(){
        var data_parent_id = [];
        var data_category_detail = []
        var config = {
            apiKey: "AIzaSyAAGopUQDY2GE0T1f_c0dYHrlaywDLqayM",
            authDomain: "my-mart-10d9a.firebaseapp.com",
            databaseURL: "https://my-mart-10d9a.firebaseio.com",
            projectId: "my-mart-10d9a",
            storageBucket: "my-mart-10d9a.appspot.com",
            messagingSenderId: "1012373943902"
          };
          firebase.initializeApp(config);
       
        $("#cb-parent-category").select2({
            data: data_parent_id
        });

        $("#data-cate-detail").DataTable({
            data:data_category_detail
        });

    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
    
    var checkCategoryId = function(){
        var cateId = $("#input-category-id").val();
        if (cateId === "")
            return false;
        db.collection("DanhMuc").doc(cateId).get().then(doc => {
            if (!doc.exists) { // if not exist
                return false;
            } else { // if exist
                return true;            
            }
        });
    }

    var checkCategoryInfo = function () {
       // if id is not exist
        if(! checkCategoryId()) { 
            // If input name blank
            if ($("#input-category-name").val() === ""){
                swal("Error!", "You are missing at Category's name !", "error");
                return false;
            }
        } else {
            swal("Error!", "The Id has already existed!", "error");
            return false;
        }
        return true;
    }

    var addData2Firestore = function () {
        const name = $("#input-category-name").val();
        const parentId = $( "#cb-parent-category option:selected" ).val();
        if ($("#input-category-id").val() !== ""){ 
            const id = $("#input-category-id").val();         
            // id = the id you created
            db.collection("DanhMuc").doc(id).set({
                Ten: name,
                idCha: parentId
            }).then(function() {
                swal("Good job!", "You added successfully!", "success");
            });
        } else {
            // Auto generate id
            db.collection("DanhMuc").add({
                Ten: name,
                idCha: parentId
            }).then(function() {
                swal("Good job!", "You added successfully!", "success");
            });
        }
    }
    var j = 0;
    var loadDanhMuc2Select2_Datatable = function () {
      //  console.log("load");
        db.collection("DanhMuc")
            .onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // about select2
                    var object_doc={};  
                    object_doc.id=doc.id;
                    object_doc.text=doc.data().Ten;
                    data_parent_id.push(object_doc);
                    // about data table
                    data_category_detail.push([doc.id,doc.data().Ten,doc.data().idCha]);
                });

                $("#cb-parent-category").select2({
                    data: data_parent_id
                });
                
                $("#data-cate-detail").DataTable({
                    destroy:true,
                    data:data_category_detail
                })
                
        });
    }
   
    loadDanhMuc2Select2_Datatable();

    $("#btn-add-category").click(function(){
        if (checkCategoryInfo()) {

            data_category_detail = [];        
            $("#data-cate-detail").DataTable({
                destroy:true,
                data:[]
            })
            // start add data into fire store   
            addData2Firestore();
        }
    });

    $("#btn-cancel-category").click(function(){       
        // clear all data:
        $("#input-category-name").val("")
        $("#input-category-id").val("")

        $("#cb-parent-category").val("None");
        $('#cb-parent-category').trigger('change'); // Notify any JS components that the value changed
    });
        
});})(window, document, jQuery);
