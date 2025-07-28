import conf from '../conf/conf.js'
import { Client,ID,Storage,Query, Databases } from 'appwrite'
export class Service{
  client=new Client();
  databases;
  bucket;
  constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
  }  
  async createPost({title,slug,content,featuredimage,status,userId}){
    try{
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredimage,
            status,
            userId,
        }
      )
    }catch(error){
     
    }
  }
  async updataPost(slug,{title,content,featuredimage,status}){
   try{
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredimage,
            status,
        }
      )
   }catch{
    console.log("appwrite service ::updata psot ::error",error)
   }
   
  }
  async deletePost(slug){
    try{
     await this.databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug,
    )
    return true
    }catch{
        console.log("appwrite service ::updata psot ::error",error);
        return false;
    }
  }
  async getPost(slug){
    try{
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      )
    }catch{
        console.log("appwrite service ::updata psot ::error",error);
        return false;
    }
  }
  async getPost(querise=[Query.equal("status","active")]){
  try{
     return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        querise,
     )
  }catch{
    console.log("appwrite service:: getpost::error",error);
  }
  }
  //file upload service
  async uploadFile(file){
    try{
     return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
     )
    }catch{
        console.log("appwrite service :: upload file ::error",error);
        return false
    }
  }
  //delete file
  async deleteFile(fileId){
    try{
     await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId,
     )
     return true
    }
    catch{
        console.log("appwrite service :: deletefile :: error",error)
    }
  }
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId,
    )
  }
}
const serivce=new Service
export default serivce
