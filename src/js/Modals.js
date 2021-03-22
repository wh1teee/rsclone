class Modals {

  injectModals () {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modals">
          <div class="accountModals">
              <div class="modal fade" id="authenticationModal" tabindex="-1" aria-labelledby="authenticationModalLabel"
                   aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered authentication modal-xl">
                      <div class="modal-content">
                          <div class="modal-body">
                              <ul class="nav nav-tabs" id="myTab" role="tablist">
                                  <li class="nav-item" role="presentation">
                                      <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab"
                                         aria-controls="home" aria-selected="true">Log in</a>
                                  </li>
                                  <li class="nav-item" role="presentation">
                                      <a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab"
                                         aria-controls="profile" aria-selected="false">sign up</a>
                                  </li>
                              </ul>
                              <div class="tab-content" id="myTabContent">
                                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                      <form class="form-horizontal" id="login-form">
                                          <div class="form-group">
                                              <label for="InputEmailLogin">Username</label>
                                              <input type="email" class="form-control" id="InputEmailLogin">
                                          </div>
                                          <div class="form-group">
                                              <label for="InputPasswordLogin">Password</label>
                                              <input type="password" class="form-control" id="InputPasswordLogin">
                                          </div>
      
                                          <div class="form-group d-grid gap-1">
                                              <button type="submit" class="btn btn-outline-primary btn-lg" value="Submit">Sign
                                                  in
                                              </button>
                                          </div>
                                      </form>
                                  </div>
                                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                      <form class="form-horizontal" id="signup-form">
                                          <div class="form-group">
                                              <!--                                <label for="InputEmail1">First Name</label>-->
                                              <!--                                <input type="text" class="form-control" id="InputEmail1">-->
                                              <!--                            </div>-->
                                              <!--                            <div class="form-group">-->
                                              <!--                                <label for="InputEmail1">Last Name</label>-->
                                              <!--                                <input type="text" class="form-control" id="InputEmail1">-->
                                              <!--                            </div>-->
                                              <div class="form-group">
                                                  <label for="InputEmailSignup">Email address</label>
                                                  <input type="email" class="form-control" id="InputEmailSignup">
                                              </div>
                                              <div class="form-group">
                                                  <label for="InputPasswordSignup">Password</label>
                                                  <input type="password" class="form-control" id="InputPasswordSignup">
                                              </div>
                                              <div class="form-group d-grid gap-1">
                                                  <button type="submit" class="btn btn-outline-primary btn-lg" value="Submit">
                                                      Sign up
                                                  </button>
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="modal fade" id="accountModal" tabindex="-1" aria-labelledby="accountModal" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Your account</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
      
                              <h4 class="account-details"></h4>
                              <!--                  <div class="account-extras"></div>-->
      
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="logout">Log out
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="developing__modals">
              <div class="modal fade" id="developingModal" tabindex="-1" aria-labelledby="developingModalLabel"
                   aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="developingModalLabel">Create a design</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              This design is being creating. Please choose another one
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="modal fade" id="existingModal" tabindex="-1" aria-labelledby="existingModalLabel"
                   aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="developingModalLabel">Create a design</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              This design is available. Please log in
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `);
  }

  appendModals(modal) {
    const modalsContainer = document.querySelector('.modals')
    modalsContainer.insertAdjacentHTML('beforeend', `${modal}`)
  }
}

const modals = new Modals();

export default modals;
