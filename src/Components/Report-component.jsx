import React,{Component} from 'react'
import {data} from '../Demo/demo'   
import './Report-component.styles.css'
import { Icon, InlineIcon } from '@iconify/react';
import starEmpty from '@iconify/icons-dashicons/star-empty';
import starFilled from '@iconify/icons-dashicons/star-filled';
import sortIcon from '@iconify/icons-dashicons/sort';

class Report extends Component{
   constructor(){
       super();
      this.state={
          filterData:{},
          favData:{},
          currentSort:'default',
          showFilter:false
        }
      this.onSortChange=this.onSortChange.bind(this)
      this.filterData=this.filterData.bind(this)
      this.toggleFavorites=this.toggleFavorites.bind(this)

   }

   componentDidMount=()=>{
       let assets={...this.state.filterData}
      data.map(k=>(
         assets[k.id]=k
      ))
      this.setState({filterData:assets})
     // I am having issues importing the mock.js file
     // In order to work with the Observable, we can subscribe it like below
     // let assetData=mock.subscribe().then(x=>{this.setState({assests:JSON.stringify(x)}))})
     // For now i have used hardcoded value the data
   }
   
   sortField=(field,type)=>{
      
       let localData=Object.values({...this.state.filterData})
       if(type==='desc'){
         field==='assetName'|| field==='type'?localData.sort((a,b)=>b[field].localeCompare(a[field])):
         localData.sort((a,b)=>b[field]-a[field])
       }
       else if(type==='asc'){
        field==='assetName'|| field==='type'?localData.sort((a,b)=>a[field].localeCompare(b[field])):
        localData.sort((a,b)=>a[field]-b[field])
       }
       else{
            localData.sort((a,b)=>a)
       }
       //console.log("print local Data-",localData)
       //Clearing localStorage when you sort
       localStorage.clear()
       this.setState({filterData:localData})
   }
   onSortChange=(fieldName)=>{
       let currentSort=this.state.currentSort
       let nextSort=''
       if(currentSort==='desc'){
           nextSort='asc'
       }
       else if(currentSort==='asc'){
           nextSort='desc'
       }
       else if(currentSort==='default'){
           nextSort='desc'
       }
       this.setState({currentSort:nextSort})
       this.sortField(fieldName,nextSort)
   }
   toggleFilter=()=>{
       this.setState({showFilter:!this.state.showFilter})
   }
    toggleFavorites=(id)=>{
        let sFavData={...this.state.favData}
        let stateData={...this.state.filterData}
       if(sFavData[id]){
          alert('Its already been marked as favorite')
           return
       }
        else{
            sFavData=stateData[id]
            localStorage.setItem(id,JSON.stringify(sFavData))
            this.setState({data:sFavData,favData:sFavData})
               
        }

    }
   filterData=(event,col)=>{
       event.preventDefault()
       let stateData=Object.values({...this.state.data})
       let val=event.target.value
       //console.log(val)
        let filteredData=stateData.filter(function(arr){
            return arr[col].toString().toLowerCase().startsWith(val.toLowerCase())
        })
         this.setState({filterData:filteredData}) 
       
       
   }

render(){
    let assets={...this.state.filterData}
   // console.log(assets)
    var tableData=[]
  //  console.log(assets)
    var newArr=[]
    let keys=Object.keys(localStorage)
    for(var i of keys){
        newArr.push(parseInt(i))
    }
//console.log(newArr)
if(newArr.length){
    for(let i=0;i<newArr.length;i++){
        if(assets[newArr[i]]){
            
        tableData.push(<tr key={assets[newArr[i]].id}>
            <td><Icon icon={starFilled} />
           </td>
            <td>{assets[newArr[i]].id}</td>
            <td>{assets[newArr[i]].assetName}</td>
            <td>{assets[newArr[i]].type}</td>
            <td>{assets[newArr[i]].price.toFixed(2)}</td>
            <td>{ Date(assets[newArr[i]].lastUpdate)}</td>
          </tr>)
          delete assets[newArr[i]]
          //console.log('Asss',assets)
        
          
    }

    }
    for(let m in assets){
        //console.log('Inside ss ',assets[m])
      tableData.push(<tr key={assets[m].id}>
          <td><button onClick={()=>this.toggleFavorites(assets[m].id)}
          title="Add to Favorites"><Icon icon={starEmpty} />
          </button></td>
          <td>{assets[m].id}</td>
          <td>{assets[m].assetName}</td>
          <td>{assets[m].type}</td>
          <td>{assets[m].price.toFixed(2)}</td>
          <td>{ Date(assets[m].lastUpdate)}</td>
        </tr>)
  }
}
else{
    for(let m in assets){
        tableData.push(<tr key={assets[m].id}>
            <td><button onClick={()=>this.toggleFavorites(assets[m].id)}
            title="Add to Favorites"><Icon icon={starEmpty} />
            </button></td>
            <td>{assets[m].id}</td>
            <td>{assets[m].assetName}</td>
            <td>{assets[m].type}</td>
            <td>{assets[m].price.toFixed(2)}</td>
            <td>{ Date(assets[m].lastUpdate)}</td>
          </tr>)
    }
}
    return(
        <table>
           <thead>
        <tr>
            <th ></th>
          <th>
              <button type='button' onClick={()=>this.onSortChange('id')}>
              
                    ID
                    </button> 
                    {this.state.showFilter ?
                    <input type="text" onChange={(e)=>this.filterData(e,'id')}></input>
                    :null
                    }
                    
              </th>
              
          <th>
          <button type='button' onClick={()=>this.onSortChange('assetName')}>
              Asset Name
              </button>
              {this.state.showFilter ?
                    
                    <input type="text" onChange={(e)=>this.filterData(e,'assetName')}></input>
                    :null
                    }

          </th>
          <th>
          <button type='button' onClick={()=>this.onSortChange('type')}>
              Type
              </button>
              {this.state.showFilter ?
                    
                    <input type="text" onChange={(e)=>this.filterData(e,'type')}></input>
                    :null
                    }

          </th>
          <th>
          <button 
          type='button' 
          
          onClick={()=>this.onSortChange('price')}>
              Price
              </button>
              {this.state.showFilter ?
                    <span>
                        <br/>
                         <input type="text" onChange={(e)=>this.filterData(e,'price')}></input>
                    </span>
                    :null
                    }
          </th>
          <th>
              <button 
          type='button' onClick={()=>this.onSortChange('lastUpdated')}>
              Last Updated
              </button>
                    <br/>
              {this.state.showFilter ?
                    <input type="text" onChange={(e)=>this.filterData(e,'lastUpdated')}></input>
                    :null
                    }
              </th>
              <th><button type='button' onClick={this.toggleFilter}>
              Show/Hide Filter
              </button></th>
        </tr>
      </thead>
      
      <tbody>
        {tableData}
      </tbody>
    </table>
        
    )
}
}
export default Report
