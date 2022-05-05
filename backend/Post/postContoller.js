const Post = require('./models/chemaPost.js');
const fileService = require('./fileService.js')

class postController {
    async createPost(req, res){
        try{
            const {title, text} = req.body;
            if(req.files){
                const picture = req.files.picture;
                var fileName = fileService.saveFile(picture);
            }else{
                var fileName = ''
            }

            Post.findOne({title: title}, function(err, posts){
                if(err) return console.log(err);

                if(!posts){
                    const post = new Post({title: title, text: text, date: new Date().toLocaleString(), image: fileName});
                    post.save();
                    res.status(200).json({message: "пост создан"});
                }else{
                    res.status(400).json({message: "заголовок с таким именем уже существует"})
                }
            });
        }catch (e){
            console.log(e)
        }
    }

    async getPost(req, res){
        try{
            const {limit, skip} = req.query
            const id = req.query._id
            if(id){
                Post.findOne({_id: id}, function (err, docs){
                    if (err){
                        console.log(err);
                        res.status(400).json({message: 'Запись не найдена'})
                    }
                    else{
                        res.status(200).json(docs)
                    }
                })
            }else{
                Post.find({}, null, {limit: limit, skip: skip}, function (err, docs) {
                    if (err){
                        console.log(err);
                        res.status(400).json({message: 'Записи не найдены'})
                    }
                    else{
                        res.status(200).json(docs)
                    }
                });
            }
        }catch (e){
            console.log(e)
        }
    }

    async putPost(req, res){
        try{
            const {nameHeaderOld, nameHeaderNew, textNew} = req.body

            admin.updateOne({nameHeader: nameHeaderOld}, {nameHeader: nameHeaderNew, text: textNew},function(err, docs){
                if(err) return err
                if(docs.modifiedCount){
                    res.status(200).json({message: "пост изменен"})
                }else{
                    res.status(400).json({message: "пост не изменен, возможно его нет???"})
                }
            });
        }catch (e){
            console.log(e)
        }
    }

    async deletePost(req, res){
        try{
            const {nameHeader, id} = req.body

            admin.deleteOne({nameHeader: nameHeader}, function(err, result){
                if(err) return err
                if(result.deletedCount){
                    res.status(200).json({message: "пост удален"})
                }else{
                    res.status(400).json({message: "пост не удален, возможно его нет???"})
                }
            });
        }catch (e){
            console.log(e)
        }
    }

    access(req, res){
        res.status(200).json({message: "Вы админ"})
    }

}

module.exports = new postController()