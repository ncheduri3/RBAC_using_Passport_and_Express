const express = require('express')
const router = express.Router()

const videosController = require('../controllers/videoController')


/*

end point: /api/videos

post, delete, put 
@returns { status: 'success' }, 200

get
@returns {norp_videos: [ {id: 1, title: "title", source: "source" },{}]}

*/
router.route('/video')
  .get(videosController.getAllVideos)
  .post(videosController.createNewVideo)
  .delete(videosController.deleteVideo)
  .put(videosController.editVideo)



/*

Send Grid Email

*/

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// function send_verification_email(request, user) {
//   from_email = 'norpadmn@gmail.com'
//   to_email = request.data['email']
//   mail_subject = 'Activate your NORP account'
//   message = render_to_string('active_email.html', {
//       'user': user,
//       'domain': request.get_host(),
//       'uid': urlsafe_base64_encode(force_bytes(user.pk)),
//       'token': account_activation_token.make_token(user),
//   })
//   email = Mail(from_email, to_email, mail_subject, html_content=message)
//   sendgrid_client.send(email)
//   return HttpResponse('Please confirm your email address to complete the registration')
// }
  
// /api/graphs

module.exports = router


