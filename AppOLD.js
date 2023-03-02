<View style={{backgroundColor: "#1E2132", height: "100%"}}>
      <ConfigContext.Provider value={config}>
      <LanguageContext.Provider value={language}>

      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setWriteComplete(false);
          }}
      >
        <CounterModal loadingColor={loadingColor} onExit={() => {setModalVisible(!modalVisible); setWriteComplete(false); StatusBar.setBackgroundColor("rgba(0,0,0,0)"); NavigationBar.setBackgroundColorAsync("#1E2132")}} writeComplete={writeComplete} sayingNr={sayingNr}/>    
      </Modal>

      { showSplash ? 
        <Splash onExit={() => {setShowSplash(false);}}/>
        : 
        <>
          {loading ? <View style={{justifyContent: "center", height: "100%"}}><CustomLoader color={"#c4c4c4"} x={100} special={true}/></View>
          :
          <>
            
            {!config.first || (config.localAuthenticationRequired && !unlocked) ? <Authenticator first={false} onSubmit={() => setUnlocked(true)} onCancel={() => setUnlocked(false)} onExit={() => null}/>
            :
            <>
              <>
                {user ? <UserContext.Provider value={user}>
                          <FriendListContext.Provider value={friendList}>

                          {config.first ? <Intro 
                                onExit={(introConfig) => handleIntroFinish(introConfig)}
                                onLanguageSelect={(lang) => toggleLanguage(lang)}
                                onAuthenticatorSelect={(bool) => handleAuthenticatorSelect(bool)}/>
                          :
                            <Home
                              friendList={friendList}
                              handleLogOut={handleLogOut}
                              toggleCounter={toggleCounter}
                              toggleLanguage={toggleLanguage}
                              deleteAccount={deleteAccount}
                              getFriendList={getFriendList}
                              loadSettings={loadSettings}
                              borderColor={borderColor}
                              onSetBorderColor={color => setBorderColor(color)}
                              refreshUser={refreshUser}
                              /> }
                          </FriendListContext.Provider>
                        </UserContext.Provider>
                :
                <Login handleLogin={handleLogin} handleCreate={handleCreate} wrongPassword={wrongPassword} emailInUse={emailInUse} userNotFound={userNotFound}/>
                }
              </>
            </>}
            </>}
        </>}
      </LanguageContext.Provider>
      </ConfigContext.Provider>
      </View>