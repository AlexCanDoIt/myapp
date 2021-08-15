const path = require('path')
const fs = require('fs/promises')
const jimp = require('jimp')
require('dotenv').config()
const createFolderIsNotExist = require('../../helpers/create-folder')
const { user: service } = require('../../services')

class UploadAvatarService {
  constructor(folderAvatars) {
    this.folderAvatars = folderAvatars
  }

  async transformAvatar(pathFile) {
    const pic = await jimp.read(pathFile)
    await pic
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile)
  }

  async saveAvatar({ idUser, file }) {
    await this.transformAvatar(file.path)
    const folderUserAvatar = path.join('public', this.folderAvatars, idUser)
    await createFolderIsNotExist(folderUserAvatar)
    await fs.rename(file.path, path.join(folderUserAvatar, file.filename))
    return path.normalize(path.join(idUser, file.filename))
  }
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user._id.toString()

    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS)
    const avatar = await uploads.saveAvatar({ idUser: id, file: req.file })

    // try {
    //   await fs.unlink(path.join('public', process.env.AVATAR_OF_USERS, req.user.avatar))
    // } catch (err) {
    //   console.log(err.message)
    // }

    await service.updateAvatar(id, avatar)
    res.json({
      status: 'success',
      code: 200,
      data: {
        avatar
      }
    })
  } catch (error) {
    next(error)
  }
}

/*
Cloud Upload:

const { promisify } = require('util')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadCloud = promisify(cloudinary.uploader.upload)
class UploadService {
  async saveAvatar(pathFile, oldIdCloudAvatar) {
    const { public_id: idCloudAvatar, secure_url: avatar } =
      await uploadCloud(pathFile, {
        public_id: oldIdCloudAvatar?.replace('myapp/avatars/', ''), // 'CloudAvatar/public_id'
        folder: 'myapp/avatars',
        transformation: { width: 250, height: 250, crop: 'pad' },
      })
    return { idCloudAvatar, avatar }
  }
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const uploads = new UploadService()
    const { idCloudAvatar, avatar } = await uploads.saveAvatar(
      req.file.path,
      req.user.idCloudAvatar,
    )

    //  delete file on folder uploads
    await fs.unlink(req.file.path)
    await service.updateAvatar(id, avatar, idCloudAvatar)
    res.json({
      status: 'success',
      code: 200,
      data: { avatar }
    })
  } catch (error) {
    next(error)
  }
}
*/

module.exports = avatars
