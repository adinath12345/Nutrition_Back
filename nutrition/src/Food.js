import React, { Component } from 'react'

export default class Food extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             foods:[],
             searchedFoods:[],
             currentFood:{
                name : "-",
                calories : 0,
                proteins : 0,
                carbs : 0,
                fats : 0,
                fibres: 0,
                weight : 0,
             }
        }
    }
    
    
    componentDidMount() {
        fetch("http://localhost:8000/foods")
        .then( (response => response.json() ) )
        .then( (foodResponse) => {
            // console.log(foodResponse)
            this.setState({foods:foodResponse.foods})
        })
        .catch( (err) => {
            console.log(err)
        })
    }

    calculateChanges(weight){
        if(weight !== "" && weight !== 0 ){
            let currFood = this.state.currentFood;

            currFood.calories = Number( (currFood.calories*weight) / currFood.weight);
            currFood.carbs = Number((currFood.carbs*weight) / currFood.weight);
            currFood.proteins = Number( (currFood.proteins*weight) / currFood.weight);
            currFood.fats = Number( (currFood.fats*weight) / currFood.weight);
            currFood.fibres = Number ((currFood.fibres*weight) / currFood.weight);
            currFood.weight =Number( weight);

            this.setState({currentFood:currFood});
        }
        
    }

    searchFood(value) {
        
        if(value !== ""){
            let searchedArray = this.state.foods.filter( (food,index) =>{
                return food.name.toLowerCase().includes(value.toLowerCase());
            })
            this.setState({searchedFoods:searchedArray});
        }
        else{
            this.setState({searchedFoods:[]});
        }
        
    }

    selectedFood(food){
        this.setState({currentFood:food})

    }

    render() {
        return (
            <div className="container">
                <div className="form-group" style= {{marginTop:"30px"}}>
                    <input className="form-control" onChange={(event) => {
                        this.searchFood(event.target.value)
                    }} placeholder="search food"/>
                </div>

                <div className="search-result">
                    {
                        this.state.searchedFoods.map((food,index)=>(
                            <div className="result" onClick={() => {
                                this.selectedFood(food);
                            }} key="index" style={{cursor:"pointer", padding:"10px"}}>
                                {food.name}
                            </div>
                        ))
                    }
                </div>
                
                <div className="product-display">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>calories</th>
                                <th>Protein</th>
                                <th>Carbs</th>
                                <th>Fibre</th>
                                <th>Fats</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.currentFood.name}</td>
                                <td>{this.state.currentFood.calories.toFixed(2)}</td>
                                <td>{this.state.currentFood.proteins.toFixed(2)}</td>
                                <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                                <td>{this.state.currentFood.fibres.toFixed(2)}</td>
                                <td>{this.state.currentFood.fats.toFixed(2)}</td>
                                <td>
                                    <input type="Number" defaultValue={this.state.currentFood.weight} onChange={(event) =>{
                                        this.calculateChanges(Number(event.target.value));
                                    }}/>
                                </td>

                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
        )
    }
}
