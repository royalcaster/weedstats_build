<View style={{width: "80%", alignSelf: "center"}}>
            <Text style={styles.label}>Counter</Text>
            <View style={{ height: 10 }}></View>
              <View
                style={[styles.activity_container, {flexDirection: "column"}]}
              >
                <View style={{flex: 1, backgroundColor: "green"}}>
                  {!loading ? 
                    <>{friendConfig.shareMainCounter ? (
                      <Animated.View style={{height: responsiveHeight(8), opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.value}>{user.main_counter}</Text>
                      </Animated.View>
                      ) 
                      : 
                      (
                        <MaterialIcons name={"lock"} style={styles.lock_icon}/>
                      )}
                      <Text style={[styles.small_label]}>GESAMT</Text>
                      </> : <View style={{height: responsiveHeight(7), justifyContent: "center"}}>
                          <CustomLoader x={30} color={"#0080FF"}/>
                      </View>}
                </View>
              

                {!loading ? 

                <Animated.View style={{width: "90%", flexDirection: "row", alignSelf: "center", flex: 1}}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                      <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.joint_counter}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>JOINT</Text>
                        <Animated.Image style={[styles.small_image,{opacity: opacityAnim2}]} source={require('../../../../../../data/img/joint.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                     <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.bong_counter}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>BONG</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(8), width: responsiveHeight(5), marginTop: responsiveHeight(-1), opacity: opacityAnim2}]} source={require('../../../../../../data/img/bong.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                      <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.vape_counter}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>VAPE</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(9), width: responsiveWidth(7), marginTop: responsiveHeight(-1), opacity: opacityAnim2}]} source={require('../../../../../../data/img/vape.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                     <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.pipe_counter}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>PFEIFE</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(9), width: responsiveWidth(10), marginTop: responsiveHeight(0), opacity: opacityAnim2}]} source={require('../../../../../../data/img/pipe.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: "center"}}>
                      <Animated.View style={{opacity: opacityAnim, transform: [{translateX: slideAnim2}]}}>
                        <Text style={styles.small_counter}>{user.cookie_counter}</Text>
                      </Animated.View>
                        <Text style={styles.small_label}>EDIBLE</Text>
                        <Animated.Image style={[styles.small_image,{height: responsiveHeight(7), width: responsiveWidth(13), marginTop: responsiveHeight(1), opacity: opacityAnim2}]} source={require('../../../../../../data/img/cookie.png')}/>
                    </View>
                </Animated.View>
                  : 
                <View style={{flex: 1, justifyContent: "center"}}>
                  <CustomLoader x={30} color={"#0080FF"}/>
                </View>}
              </View>
              </View>