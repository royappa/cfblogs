import * as functions from 'firebase-functions';
import * as cors from 'cors';


const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'codeforces-blogs';
const firestore = new Firestore({
  projectId: PROJECTID
});

const corsFn = cors({
  origin: true,
});

const axios = require('axios');
const cfURL = 'https://codeforces.com/api/recentActions?maxCount=100';

//creates scheduler job firebase-schedule-updateRecentBlogs-us-central1
exports.updateRecentBlogs = functions.pubsub.schedule('every 10 minutes').onRun(async (context) => {
  // MAIN FUNCTION BODY (INSIDE CONTEXT)
  try {
    const response = await axios.get(cfURL);
    const data = response.data;
    if (data.status === 'OK') {
      const recentBlogs: any = [];
      const ids: any = [];
      data.result.forEach((ra: any) => {
        const id = ra.blogEntry.id;
        if (!ids.includes(id)) {
          ra.blogEntry.title = ra.blogEntry.title.replace(/<[^>]*>?/gm, '');
          ra.blogEntry.updateTimeSeconds = ra.timeSeconds;
          if ('comment' in ra) {
            ra.blogEntry.lastComment = ra.comment;
          }          
          recentBlogs.push(ra.blogEntry);
          ids.push(id);
        }
      });
      const promises = recentBlogs.map((be:any) => firestore.collection('blogEntries').doc(""+be.id).set(be, {merge: true}));
      await Promise.all(promises);
      console.log({ status: 'OK', date: Date.now() });
    }
    else {
      console.log({ error: 'Remote server error.' });
    }
  }
  catch (error) {
    console.log(error);
  }
  return null;
  //END MAIN FUNCTION BODY (INSIDE CONTEXt)
});


// Clone of above mainly for testing
// https://us-central1-codeforces-blogs.cloudfunctions.net/updateRecentActions
export const updateRecentActions = functions.https.onRequest((req, res) => {

  // CORS wrapper: check later to make sure this is not too permissive
  return corsFn(req, res, async () => {
    // MAIN FUNCTION BODY (INSIDE CORS)
    
    try {
      const response = await axios.get(cfURL);
      const data = response.data;
      if (data.status === 'OK') {  
        const recentBlogs: any = [];
        const ids: any = [];  
        data.result.forEach((ra: any) => {
          const id = ra.blogEntry.id;
          if (!ids.includes(id)) {
            ra.blogEntry.title = ra.blogEntry.title.replace(/<[^>]*>?/gm, '');
            ra.blogEntry.updateTimeSeconds = ra.timeSeconds;
            if ('comment' in ra) {
              ra.blogEntry.lastComment = ra.comment;
            }
            recentBlogs.push(ra.blogEntry);
            ids.push(id);
          }
        });
        const promises = recentBlogs.map((be:any) => firestore.collection('blogEntries').doc(""+be.id).set(be, {merge: true}));
        await Promise.all(promises);
        res.status(200).send({status: 'OK', date: Date.now()});
      }
      else {
        res.status(500).send({error: 'Remote server error.'});
      }
    }
    catch (error) {
      console.log(error);
      res.status(500).send(error);
    }      
    //END MAIN FUNCTION BODY (INSIDE CORS)
  });
});


// Public web service for others to use, and us too for convenience in client code
//https://us-central1-codeforces-blogs.cloudfunctions.net/getBlogEntries
export const getBlogEntries = functions.https.onRequest((req, res) => {

  // CORS wrapper: check later to make sure this is not too permissive
  return corsFn(req, res, async () => {
    // MAIN FUNCTION BODY (INSIDE CORS)
    try {
      const snapshot = await firestore.collection('blogEntries').orderBy('updateTimeSeconds', 'desc').get();
      res.status(200).send(snapshot.docs.map((doc: any) => doc.data()));
    }
    catch (error) {
      console.log('Error: ', error);
      res.status(500).send(error);
    }
    //END MAIN FUNCTION BODY (INSIDE CORS)
  });
});