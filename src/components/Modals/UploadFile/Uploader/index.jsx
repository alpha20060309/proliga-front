'use client'

import '@uppy/dashboard/dist/style.min.css'
import '@uppy/core/dist/style.min.css'

import Russian from '@uppy/locales/lib/ru_RU'
import Uzbek from '@uppy/locales/lib/uz_UZ'
import Uppy from '@uppy/core'
import mime from 'mime'
import UppyServerActionUpload from 'app/plugins/UploadFile/UppyServerActionUpload'
import { Dashboard } from '@uppy/react'
import { useSelector } from 'react-redux'
import { useState, useMemo, useEffect } from 'react'
import { saveFile } from 'app/actions/saveFile.action'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { useUpdateUserPhoto } from 'app/hooks/user/useUpdateUserPhoto/useUpdateUserPhoto'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

export const UppyUploader = ({ closeModal }) => {
  const { lang } = useSelector((state) => state.systemLanguage)
  const userTable = useSelector(selectUserTable)
  const { updateUserPhoto } = useUpdateUserPhoto()
  const [fileType, setFileType] = useState('')
  const dir = 'user'
  const subDir = useMemo(() => userTable?.id.toString() || '', [userTable])
  const path = useMemo(
    () => `/${dir}/${subDir}/image.${fileType}`,
    [dir, subDir, fileType]
  )

  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      allowMultipleUploadBatches: false,
      locale: getCorrectName({ lang, uz: Uzbek, ru: Russian }),
      restrictions: {
        maxFileSize: 5 * 1024 * 1024, // 5 mb
        allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
      },
    }).use(UppyServerActionUpload, {
      action: saveFile,
      dir,
      subDir,
    })
  )

  useEffect(() => {
    uppy.on('file-added', async (result) => {
      setFileType(mime.getExtension(result.data.type))
    })
  }, [uppy])

  useEffect(() => {
    if (fileType && path) {
      uppy.on('upload-success', async () => {
        await updateUserPhoto({ path, cb: () => closeModal(), userTable })
      })
    }
  }, [uppy, path, fileType, userTable, closeModal, updateUserPhoto])

  return <Dashboard className="w-full rounded-xl" theme="dark" uppy={uppy} />
}
