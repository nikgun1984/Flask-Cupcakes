$(async function() {
    const $allCakesList = $("#all-cakes-list");
    const $submitForm = $("#submit-form");
    let cakeList = null;

    await generateCakeList();

    async function generateCakeList() {
        // get an instance of CakeList
        const cakeListInstance = await CakeList.getCakes();
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
            <td>${cake.flavor}</td>
            <td>${cake.size}</td>
            <td>${cake.rating}</td>
            <td><img src="${cake.image}" class="img-fluid img-thumbnail" alt="..." style="width: 100px"></td>
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

    $submitForm.on("submit", async function(evt) {
        evt.preventDefault(); // no page-refresh on submit
        const flavor = $("#flavor").val();
        const size = $("#size").val();
        const rating = $("#rating").val()
        const image = $("#image").val()
    
        // call the create method, which calls the API and then builds a new cake instance
        addNewCake(flavor,size,rating,image);
      });
});