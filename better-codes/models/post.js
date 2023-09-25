const { ObjectId } = require("mongodb");
const db = require("../data/database");

//Defining a blueprint for a post
class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAll() {
    const posts = await db.getDb().collection("posts").find().toArray();
    console.log("모든 포스트를 불러왔습니다.");
    return posts;
  }

  async fetch() {
    //this.id를 이용하여 this.title,this.content 정보를 db에서 추출
    if (!this.id) {
      return;
    }
    const post = await db.getDb().collection("posts").findOne({ _id: this.id });
    console.log("포스트를 불러왔습니다");
    this.title = post.title;
    this.content = post.content;
  }

  async save() {
    let result;
    if (this.id) {
      result = await db
        .getDb()
        .collection("posts")
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
      console.log("업데이트 완료");
    } else {
      result = await db.getDb().collection("posts").insertOne({
        title: this.title,
        content: this.content,
      });
      console.log("새로운 포스트가 추가되었습니다.");
    }
    return result;
  }

  async delete() {
    if (!this.id) {
      return;
    }
    const result = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });
    return result;
  }
}

module.exports = Post;
