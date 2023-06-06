var Minio = require('minio');
const config = require('../config');

var minioClient = new Minio.Client({
    endPoint: config.get('minio').host,
    port: config.get('minio').port,
    useSSL: false,
    accessKey: config.get('minio').accessKey,
    secretKey: config.get('minio').secretKey
});

const bucket = 'memoboard'
const validateBucket = (bucket) => {
    return new Promise((resolve, reject) => {
        return minioClient.bucketExists(bucket, (err, exists) => {
            if (err) throw err;
            if (!exists) {
                return minioClient.makeBucket(bucket, 'us-east-1', (err) => {
                    if (err) reject(err);
                    console.log(`Creating Bucket: ${bucket}`);
                    resolve();
                });
            }
            console.log('Bucket exists.');
            resolve();     
        });
    });
}

const getUploadUrl = async (bucket, filename) => {
    try {
        return await validateBucket(bucket).then(() => {
            return minioClient.presignedPutObject(bucket, filename, 5*60, (err, presignedUrl) => {
                if (err) return console.log(err)
                
                return presignedUrl;
            })
        });
    } catch (err) {
        throw err;
    };
}

const uploadObject = async (bucket, filepath, file) => {
    try {
        return await validateBucket(bucket).then(() => {
            console.log('uplaod')
            var metaData = {
                'Content-Type': 'image/png',
                'Content-Language': 123,
                'X-Amz-Meta-Testing': 1234,
                'example': 5678
            }
            return minioClient.fPutObject(bucket, filepath, file, metaData, (err, objInfo) => {
                if(err) {
                    return console.log(err)
                }
                console.log("Success", objInfo.etag, objInfo.versionId)
            });
        })
        
    } catch(err){
        console.log(err)
    }
}
