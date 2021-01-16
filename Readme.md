# Sftp upload javascript action

This actions uploads afile to an sftp server using [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client)

## Inputs

### `user`

The sftp user name. If not set the action is skipped.

### `server`

The sftp server. If not set the action is skipped.

### `privateKey`

The private key. Use someting like `${{ secrets.REPO_KEY }}`.

### `password`

The password. One of private Key or password must be set.

### `localFile`

**Required** The local file to be uploaded.

### `remoteDir`

**Required** The remote directory. Will be created if not existing.


The time we greeted you.

## Example usage

```
uses: wellenvogel/sftp-upload-action@v1.1
with:
  user: ${{ secrets.REPO_USER }}
  server: ${{ secrets.REPO_SERVER }}
  privateKey: ${{ secrets.REPO_KEY }}
  localFile: 'archive.tgz'
  remoteDir: '/uploads/example'

```  