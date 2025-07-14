

interface Props {
    params: {
      locale: string;
    }
  }

export default async function Page({params}: {params: Promise<{ locale: string }>;}) {

    const { locale } = await params;

    if(locale == "ko"){
        return (
            <div className="container py-12">
                <h2 className="heading-2">개인정보 처리 방침</h2>
                <p className="paragraph">
                    &lt;한국화랑협회&gt;(&#39;KIAF SEOUL VIP App&#39;이하 &#39;KIAF SEOUL&#39;)은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다. &lt;한국화랑협회&gt;(&#39;KIAF SEOUL &#39;)&nbsp;은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.<br/>
                    ○ 본 방침은부터&nbsp;2023년&nbsp;7월&nbsp;1일부터 시행됩니다.
                </p>
                <p className="paragraph">
                    1. 개인정보의 처리 목적&nbsp;&lt;한국화랑협회&gt;(&#39;KIAF SEOUL VIP App&#39;이하 &#39;KIAF SEOUL&#39;)은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.
                </p>
                <p className="paragraph">
                    가. 홈페이지 회원가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 각종 고지·통지, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 처리합니다.<br/>
                    나. 재화 또는 서비스 제공 : 콘텐츠 제공 등을 목적으로 개인정보를 처리합니다.<br/>
                    다. 마케팅 및 광고에의 활용 : 이벤트 및 광고성 정보 제공 및 참여기회 제공 등을 목적으로 개인정보를 처리합니다.<br/>
                </p>

                <p className="paragraph">
                    2. 개인정보 파일 현황<br/>
                    1. 개인정보 파일명 : 회원가입<br/>
                    - 개인정보 항목 : 이메일, 비밀번호, 로그인ID, 성별, 생년월일, 이름, 직업, 취미<br/>
                    - 수집방법 : 어플리케이션<br/>
                    - 보유근거 : 내부정보취합자료<br/>
                    - 보유기간 : 3년<br/>
                </p>

                <p className="paragraph">
                    3. 개인정보의 처리 및 보유 기간<br/>
                    ①&nbsp;&lt;한국화랑협회&gt;(&#39;KIAF SEOUL &#39;)은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유,이용기간 내에서 개인정보를 처리,보유합니다.<br/>
                    ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br/>
                    1.&lt;홈페이지 회원가입 및 관리&gt;
                    &lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&lt;3년&gt;까지 위 이용목적을 위하여 보유.이용됩니다.-보유근거 : 내부 정보 취합자료용 -관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년<br/>
                </p>

                <p className="paragraph">
                    4. 개인정보의 제3자 제공에 관한 사항<br/>
                    ①&nbsp;&lt;한국화랑협회&gt;(&#39;KIAF SEOUL VIP App&#39;이하 &#39;KIAF SEOUL&#39;)은(는) 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.<br/>
                    ②&nbsp;&lt;한국화랑협회&gt;(&#39;KIAF SEOUL&#39;)은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.<br/>
                    1. &lt;한국화랑협회 (KIAF SEOUL)&gt;- 개인정보를 제공받는 자 : 한국화랑협회 (KIAF SEOUL)- 제공받는 자의 개인정보 이용목적 : 이메일, 비밀번호, 로그인ID, 성별, 생년월일, 이름, 직업, 취미- 제공받는 자의 보유.이용기간: 3년<br/>
                </p>

                <p className="paragraph">
                    5. 개인정보처리 위탁<br/>
                    ①&lt;한국화랑협회&gt;(&#39;KIAF SEOUL&#39;)은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.<br/>
                    ②&nbsp;&lt;한국화랑협회&gt;(&#39;KIAF SEOUL VIP App&#39;이하 &#39;KIAF SEOUL&#39;)은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.<br/>
                </p>

                <p className="paragraph">
                    6. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.<br/>
                    ① 정보주체는 한국화랑협회에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.<br/>
                    ② 제1항에 따른 권리 행사는한국화랑협회에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 한국화랑협회은(는) 이에 대해 지체 없이 조치하겠습니다.<br/>
                    ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br/>
                    ④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.<br/>
                    ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.⑥ 한국화랑협회은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.<br/>
                </p>

                <p className="paragraph">
                    7. 처리하는 개인정보의 항목 작성<br/>
                    ①&nbsp;&lt;한국화랑협회&gt;(&#39;KIAF SEOUL VIP App&#39;이하 &#39;KIAF SEOUL&#39;)은(는) 다음의 개인정보 항목을 처리하고 있습니다.
                    1&lt;홈페이지 회원가입 및 관리&gt;- 필수항목 : 이메일, 비밀번호, 로그인ID, 성별, 생년월일, 이름, 직업, 취미- 선택항목 : 이메일, 비밀번호, 로그인ID, 성별, 생년월일, 이름, 직업, 취미<br/>
                </p>

                <p className="paragraph">
                    8. 개인정보의 파기&lt;한국화랑협회&gt;(&#39;KIAF SEOUL&#39;)은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.<br/>
                    -파기절차이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니 고서는 다른 목적으로 이용되지 않습니다.<br/>
                    -파기기한이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.<br/>
                    -파기방법전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.<br/>
                </p>

                <p className="paragraph">
                    9. 쿠키 및 웹 비콘<br/>
                    다른 앱과 마찬가지로, KIAF SEOUL VIP App도 &#39;쿠키&#39;를 사용합니다. 이러한 쿠키는 사용자들의 선호도 및 사용자가 앱에서 접근하거나 방문한 페이지와 같은 정보를 저장하는 데 사용됩니다. 이 정보는 사용자의 장치 유형 및 기타 정보에 따라 앱 콘텐츠를 사용자 맞춤화하여 최적의 사용자 경험을 제공하기 위해 사용됩니다.<br/>
                </p>
                <p className="paragraph">
                    10. 개인정보 보호책임자 작성<br/>
                    ① 한국화랑협회(‘KIAF SEOUL VIP App’이하 ‘KIAF SEOUL ) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br/>
                    ▶ 개인정보 보호책임자성명: 손혜현 / 직책: 부장작급 / 부장연락처: 027663702, kiaf@kiaf.org ※ 개인정보 보호 담당부서로 연결됩니다.<br/>
                    ▶ 개인정보 보호 담당부서부서명: Kiaf SEOUL / 사무국담당자: 유리나 / 연락처: 027663703 design@kiaf.org<br/>
                    ② 정보주체께서는 한국화랑협회(‘KIAF SEOUL VIP App’이하 ‘KIAF SEOUL&#39;) 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 한국화랑협회(‘KIAF SEOUL VIP App’이하 ‘KIAF SEOUL&#39;) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.<br/>
                </p>
                
                <p className="paragraph">
                    11. 개인정보 처리방침 변경<br/>
                    ①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.<br/>
                </p>
                <p className="paragraph">
                    12. 개인정보의 안전성 확보 조치&nbsp;&lt;한국화랑협회&gt;(&#39;KIAF SEOUL&#39;)은(는) 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.<br/>
                    1. 내부관리계획의 수립 및 시행개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.2. 개인정보에 대한 접근 제한개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
                </p>
            </div>

        )
    } else {
        return (
            <>

                <div className="container py-12">
                    <h2 className="heading-2">Privacy Policy</h2>
                    <p className="paragraph">At KIAF SEOUL VIP App, one of our main priorities is the privacy of our users. This Privacy Policy document contains the types of information that is collected and recorded by KIAF SEOUL VIP App and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
                    <p className="paragraph">This Privacy Policy applies only to our mobile application and is valid for users of our app with regards to the information that they shared and/or collected in KIAF SEOUL VIP App. This policy does not apply to any information collected offline or via channels other than this application.</p>

                    <h3 className="heading-3">Consent</h3>
                    <p className="paragraph">By using our app, you hereby consent to our Privacy Policy and agree to its terms.</p>

                    <h3 className="heading-3">Information We Collect</h3>
                    <p className="paragraph">The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
                    <p className="paragraph">If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
                    <p className="paragraph">When you register for an account, we may ask for your contact information, including items such as name, birth year, email address, nationality, occupation, etc.</p>

                    <h3 className="heading-3">How We Use Your Information</h3>
                    <p className="paragraph">We use the information we collect in various ways, including to:</p>
                    <ul className="ulist">
                        <li>Provide, operate, and maintain our app</li>
                        <li>Improve, personalize, and expand our app</li>
                        <li>Understand and analyze how you use our app</li>
                        <li>Develop new features and functionality</li>
                        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the app, and for marketing and promotional purposes</li>
                        <li>Send you emails (newsletter)</li>
                        <li>Find and prevent fraud</li>
                    </ul>

                    <h3 className="heading-3">Log Files</h3>
                    <p className="paragraph">KIAF SEOUL VIP App follows a standard procedure of using log files. These files log users when they use the app. All hosting companies do this as part of hosting services&#39; analytics. The information collected by log files includes internet protocol (IP) addresses, device type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the app, tracking users&#39; movement on the app, and gathering demographic information.</p>

                    <h3 className="heading-3">Cookies and Web Beacons</h3>
                    <p className="paragraph">Like any other app, KIAF SEOUL VIP App uses &#39;cookies&#39;. These cookies are used to store information including users&#39; preferences, and the pages on the app that the user accessed or visited. The information is used to optimize the users&#39; experience by customizing our app content based on users&#39; device type and/or other information.</p>

                    <h3 className="heading-3">Advertising Partners Privacy Policies</h3>
                    <p className="paragraph">You may consult this list to find the Privacy Policy for each of the advertising partners of KIAF SEOUL VIP App.</p>
                    <p className="paragraph">Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on KIAF SEOUL VIP App, which are sent directly to users&#39; device. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
                    <p className="paragraph">Note that KIAF SEOUL VIP App has no access to or control over these cookies that are used by third-party advertisers.</p>

                    <h3 className="heading-3">Third Party Privacy Policies</h3>
                    <p className="paragraph">KIAF SEOUL VIP App&#39;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
                    <p className="paragraph">You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&#39; respective websites.</p>

                    <h3 className="heading-3">CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
                    <p className="paragraph">Under the CCPA, among other rights, California consumers have the right to:</p>
                    <ul className="ulist">
                        <li>Request that a business that collects a consumer&#39;s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                        <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                        <li>Request that a business that sells a consumer&#39;s personal data, not sell the consumer&#39;s personal data.</li>
                    </ul>
                    <p className="paragraph">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

                    <h3 className="heading-3">GDPR Data Protection Rights</h3>
                    <p className="paragraph">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                    <ul className="ulist">
                        <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                        <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                        <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                        <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                        <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                        <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                    </ul>
                    <p className="paragraph">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

                </div>

            </>
        )
    }
    
}