(function(window, document, $) {
    'use strict';
    var data_cate_id = [];
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

    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
    $("#cb-category-id").select2({
        data:data_cate_id
    });

    // Currency in USD
    $('.currency-mask').inputmask("$9999");
    $('.number-mask').inputmask({ "alias": "decimal" , "radixPoint": "." });

    var loadDanhMuc2Select2 = function () {
        db.collection("DanhMuc")
            .onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // about select2
                    var object_doc={};  
                    object_doc.id=doc.id;
                    object_doc.text=doc.data().Ten;
                    data_cate_id.push(object_doc);
                });
                console.log(data_cate_id);
                $("#cb-category-id").select2({
                    data: data_cate_id
                });
        });
    }

    var checkProductId = function () {
        var product_id = $("#product-id").val();
        if (product_id === "")
            return false;
        db.collection("SanPham").doc(product_id).get().then(doc => {
            if (!doc.exists) { // if not exist
                return false;
            } else { // if exist
                return true;            
            }
        });
    }
    

    var addProduct2Firetore = function() {
        const product_name = $("#product-name").val();
        const original_price = $( "#original-price" ).val();
        const price = $( "#price" ).val();
        const description = $("#description").val();
        const category_id = $( "#cb-category-id option:selected" ).val();

        if ($("#product-id").val() !== "") {
            const id = $("#product-id").val();         
            // id = the id you created
            db.collection("SanPham").doc(id).set({
                Ten: product_name,
                GiaBan: price,
                GiaMua:original_price,
                SoLuong:0,
                DanhMuc:category_id,
                HinhAnh:"",
                MoTa:description
            }).then(function() {
                swal("Good job!", "You added successfully!", "success");
            });
        } else {
            db.collection("SanPham").add({
                Ten: product_name,
                GiaBan: price,
                GiaMua:original_price,
                SoLuong:0,
                DanhMuc:category_id,
                MoTa:description
            }).then(function() {
                swal("Good job!", "You added successfully!", "success");
            });
        }

    }

    var checkProductInfo = function() {
        if (!checkProductId()) {
            if ($("#product-name").val() === ""){
                swal("Error!", "You are missing Product's name !", "error");
                return false;
            }
            if ($("#original-price").val() === "") {
                swal("Error!", "You are missing Original price !", "error");
                return false;
            }
            if ($("#price").val() === "") {
                swal("Error!", "You are missing Price !", "error");
                return false;
            }
            if ($("#description").val() === "") {
                swal("Error!", "You are missing Description !", "error");
                return false;
            }
            if ($( "#cb-category-id option:selected" ).val() ==="None") {
                swal("Error!", "You are missing Category id !", "error");
                return false;
            }
        } else {
            swal("Error!", "The Id has already existed!", "error");
            return false;
        }
        return true;
    }

    loadDanhMuc2Select2();

    $("#btn-cancel-product").on("click",function(){
        $("#product-id").val("");
        $("#product-name").val("");
        $("#original-price").val("");
        $("#price").val("");
        $("#description").val("");
        $("#cb-category-id").val("None");
        $('#cb-category-id').trigger('change'); // Notify any JS components that the value changed

    });

    $("#btn-add-product").on("click",function(){
        // add data:
        if (checkProductInfo()) {
            addProduct2Firetore();
        }
    });

});})(window, document, jQuery);