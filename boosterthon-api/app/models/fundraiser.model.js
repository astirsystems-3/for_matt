module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
        fundlabel : String,
        rating : Number,
        review : String,
        reviewername: String,
        revieweremail: String,
        reviewdate: String
      },
      { timestamps: true }
    );

    schema.method("toJSON", function(){
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const Fundraiser = mongoose.model("fundraiser", schema);
    return Fundraiser;
};
