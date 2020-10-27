$(async function() {
    const $allCakesList = $("#all-cakes-list");
    const $submitForm = $("#submit-form");
    const $searchCake = $("#search-form");
    let cakeList = null;

    await generateCakeList(CakeList.getCakes);

    async function generateCakeList(func,keyword="") {
        // get an instance of CakeList
        const cakeListInstance = await func(keyword);
        // update our global variable
        cakeList = cakeListInstance;
        // empty out that part of the page
        $allCakesList.empty();
    
        // loop through all of our cakes and generate HTML for them
        for (let cake of cakeList.cakes) {
          const res = getCakeHTML(cake);
          $allCakesList.append(res);
        }
    }

    function getCakeHTML(cake){
        const result = $(`
          <tr data-id="${cake.id}">
            <th scope="row">${cake.id}</th>
            <td class="flavor">${cake.flavor}</td>
            <td class="size">${cake.size}</td>
            <td class="rating">${cake.rating}</td>
            <td class="image"><img src="${cake.image}" class="img-fluid img-thumbnail" alt="..." style="width: 100px"></td>
            <td> <i class="fas fa-edit"></i></td>
            <td> <i class="fas fa-trash"></i></td>
          </tr>
        `);
        return result;
    }

    async function addNewCake(flavor,size,rating,image){
        // call the create method, which calls the API and then builds a new cake instance
        let newCake = await CakeList.addCupcake({flavor,size,rating,image});
        const res = getCakeHTML(newCake);
        $allCakesList.append(res);
    }

    async function updateCake(flavor,size,rating,image,id){
        let cake = await CakeList.updateCake({flavor,size,rating,image},id);
        await generateCakeList(CakeList.getCakes);
    }

    $submitForm.on("submit", async function(evt) {
        evt.preventDefault();
        const flavor = $("#flavor").val();
        const size = $("#size").val();
        const rating = $("#rating").val()
        const image = $("#image").val()
    
        // call the create method, which calls the API and then builds a new cake instance
        if($('h3#title').text() === "Add Cupcake"){
            addNewCake(flavor,size,rating,image);
        } else {
            const id = $("#cake_id").val();
            updateCake(flavor,size,rating,image,id);
            $('h3#title').text('Add Cupcake');
            $("#submit-form")[0].reset();   
        }
    });

    $('td i.fas.fa-edit').on("click", function(evt){
        console.log('I clicked')
        //evt.preventDefault();
        const id = $(this).parent().parent().data('id');
        $("#cake_id").val(id);
        $("#flavor").val($(`tr[data-id="${id}"]`).children('.flavor').text());
        $("#size").val($(`tr[data-id="${id}"]`).children('.size').text());
        $("#rating").val($(`tr[data-id="${id}"]`).children('.rating').text());
        $("#image").val($(`tr[data-id="${id}"] img`).attr("src"));
        $('h3#title').text('Edit Cupcake');
        // updateCake(flavor,size,rating,image,id);
    })

    $searchCake.on("submit",async function(evt) {
        evt.preventDefault();
        const $keyword = $('input[name=search]').val()
        console.log($keyword);
        generateCakeList(CakeList.getQueryCakes,$keyword);
        $('input[name=search]').val('')
    })

    function resetAllFields(){
        $("")
        $("#flavor").val('');
        $("#size").val('');
        $("#rating").val('')
        $("#image").val('')
    }
});