class CakeList {
    constructor(cakes) {
      this.cakes = cakes;
    }
  
    static async getCakes(keyword="") {
      // query the / endpoint
      const response = await axios.get('/api/cupcakes');
      const cupcakes = response.data.cupcakes.map(cupcake => new Cupcake(cupcake));
      // the new array of cakes
      const cakeList = new CakeList(cupcakes);
      return cakeList;
    }

    static async getQueryCakes(keyword){
      const response = await axios.get('/api/cupcakes/search', { params: { search: keyword } });
      const cupcakes = response.data.cupcakes.map(cupcake => new Cupcake(cupcake));
      const cakeList = new CakeList(cupcakes);
      return cakeList;
    }
  
    static async addCupcake(newCupcake) {
      const response = await axios.post("/api/cupcakes", 
        {
          flavor: newCupcake.flavor,
          size: newCupcake.size,
          rating: newCupcake.rating,
          image: newCupcake.image
        }
      );
  
      const cupcake = new Cupcake(response.data.cupcake);
      return cupcake;
    }

    static async updateCake(cupcake,id){
      
      const response = await axios.patch(`/api/cupcakes/${id}`,
          {
            flavor: cupcake.flavor,
            size: cupcake.size,
            rating: cupcake.rating,
            image: cupcake.image
          }
      );
      return response.data;
    }

    static async deleteCupcake(id){
    
      const response = await axios.delete(`/api/cupcakes/${id}`);
      return response.data;
    }
}

class Cupcake {
    constructor(cakeObj) {
      this.id = cakeObj.id;
      this.flavor = cakeObj.flavor;
      this.size = cakeObj.size;
      this.rating = cakeObj.rating;
      this.image = cakeObj.image;
    }
}
