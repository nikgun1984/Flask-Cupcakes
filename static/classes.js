class CakeList {
    constructor(cakes) {
      this.cakes = cakes;
    }
  
    static async getCakes() {
      // query the / endpoint
      const response = await axios.get('/api/cupcakes');
      const cupcakes = response.data.cupcakes.map(cupcake => new Cupcake(cupcake));
      // the new array of cakes
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
