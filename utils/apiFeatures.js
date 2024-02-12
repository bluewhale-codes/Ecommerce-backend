class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this;
    }
    catagorySearch(){
        const catagory = this.queryStr.catagory ?{
            catagory:{
                $regex:this.queryStr.catagory,
                $options:"i",
            },
        }:{};
       
        this.query = this.query.find({...catagory})
        return this;
    }
    orderStatus(umer){
        const orderstatus = this.queryStr.orderStatus ?{
            orderStatus:{
                $regex:this.queryStr.orderStatus,
                $options:"i",
            },
        }:{user:umer._id};
        
       
        this.query = this.query.find({user:umer._id,...orderstatus})
        return this;
    }


    // filter(){
    //     const queryCopy = {...this.queryStr};
    //     console.log(queryCopy);

    //     //Removing some field for catagory
    //     const removeFields = ["keyword","page","limit"]

    //     removeFields.forEach((key) => delete queryCopy[key])

    //     // Filter for price and rating
    //     let queryStr = JSON.stringify(queryCopy);
    //     console.log(queryCopy)

    //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
        
    //     this.query = this.query.find(JSON.parse(queryStr));
    //     this.query = this.query.find(queryCopy);
    //     // console.log(queryStr);
    //     return this;

    // }
    pagination(resultPerPage){
         const currentPage = Number(this.queryStr.page) || 1;
         const skip = resultPerPage * (currentPage - 1);
         this.query  = this.query.limit(resultPerPage).skip(skip);
         return this;
    }
};

module.exports = ApiFeatures