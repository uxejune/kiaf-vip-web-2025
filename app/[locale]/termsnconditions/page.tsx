

interface Props {
    params: {
      locale: string;
    }
}

export default async function Page({params}: {params: Promise<{ locale: string }>;}) {
    
    const { locale } = await params;

    if(locale == 'ko'){
        return (
            <div className="container py-12">
                {/* terms and condition */}

                <h2 className="heading-2">Terms &amp; Conditions</h2>

                <p className="paragraph">이용약관</p>
                <p className="paragraph">제 1장 총칙</p>
                
                <p className="paragraph">
                    제 1 조 (목적)<br/>
                    이 이용약관은 “KIAF SEOUL Vip App (이하 &quot;당 어플리케이션&quot;)”에서 제공하는 서비스(이하 &#39;서비스&#39;)의 가입조건, 당 어플리케이션 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br/>
                </p>

                <p className="paragraph">
                    제 2 조 (용어의 정의)<br/>
                    1. &quot;이용자&quot;라 함은 당 어플리케이션에 접속하여 이 약관에 따라 당 어플리케이션이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br/>
                    2. “KIAF SEOUL VIP App”에서 제공하는 인증지원 정보를 말합니다.<br/>
                    3. &quot;회원&quot;이라 함은 서비스를 이용하기 위하여 당 어플리케이션에 개인정보를 제공하여 아이디(ID)와 비밀번호를 부여 받은 자를 말합니다.<br/>
                    4. “비회원”이하 함은 회원으로 가입하지 않고 &quot; KIAF SEOUL Vip App &quot;에서 제공하는 서비스를 이용하는 자를 말합니다.<br/>
                    5. &quot;회원 아이디(ID)&quot;라 함은 회원의 식별 및 서비스 이용을 위하여 자신이 선정한 문자 및 숫자의 조합을 말합니다.<br/>
                    6. &quot;비밀번호&quot;라 함은 회원이 자신의 개인정보 및 직접 작성한 비공개 콘텐츠의 보호를 위하여 선정한 문자, 숫자 및 특수문자의 조합을 말합니다.<br/>
                </p>

                <p className="paragraph">
                    제 3 조 (이용약관의 효력 및 변경)<br/>
                    1. 당 어플리케이션은 이 약관의 내용을 회원이 알 수 있도록 당 어플리케이션의 초기 서비스화면에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.<br/>
                    2. 당 어플리케이션은 이 약관을 개정할 경우에 적용일자 및 개정사유를 명시하여 현행 약관과 함께 당 어플리케이션의 초기화면 또는 초기화면과의 연결화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 당 어플리케이션은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.<br/>
                    3. 당 어플리케이션이 전항에 따라 개정약관을 공지하면서 “개정일자 적용 이전까지 회원이 명시적으로 거부의 의사표시를 하지 않는 경우 회원이 개정약관에 동의한 것으로 봅니다. ”라는 취지를 명확하게 공지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 않은 경우에는 개정약관에 동의한 것으로 봅니다. 회원이 개정약관에 동의하지 않는 경우 당 어플리케이션 이용계약을 해지할 수 있습니다.<br/>
                </p>
                <p className="paragraph">
                    제 4 조(약관 외 준칙)<br/>
                    1. 이 약관은 당 어플리케이션이 제공하는 서비스에 관한 이용안내와 함께 적용됩니다.<br/>
                    2. 이 약관에 명시되지 아니한 사항은 관계법령의 규정이 적용됩니다.<br/>
                </p>

                <p className="paragraph">
                    제 2 장 이용계약의 체결<br/>
                </p>
                <p className="paragraph">
                    제 5 조 (이용계약의 성립 등)<br/>
                    이용계약은 이용고객이 당 어플리케이션이 정한 약관에 「동의합니다」를 선택하고, 당 어플리케이션이 정한 회원가입양식을 작성하여 서비스 이용을 신청한 후, 당 어플리케이션이 이를 승낙함으로써 성립합니다.<br/>
                </p>
                <p className="paragraph">
                    제 6 조 (회원가입)<br/>
                    서비스를 이용하고자 하는 고객은 당 어플리케이션에서 정한 회원가입양식에 개인정보를 기재하여 가입을 하여야 합니다.<br/>
                </p>
                <p className="paragraph">
                    제 7 조 (개인정보의 보호 및 사용)<br/>
                    당 어플리케이션은 관계법령이 정하는 바에 따라 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위해 노력합니다. 회원 개인정보의 보호 및 사용에 대해서는 관련법령 및 당 어플리케이션의 개인정보 보호정책이 적용됩니다. 다만, 당 어플리케이션 이외에 링크된 사이트에서는 당 어플리케이션의 개인정보 보호정책이 적용되지 않습니다.<br/><br/>
                    제 8 조 (이용 신청의 승낙과 제한)<br/>
                    1. 당 어플리케이션은 제6조의 규정에 의한 이용신청고객에 대하여 약관에 정하는 바에 따라 서비스 이용을 승낙합니다.<br/>
                    2. 당 어플리케이션은 아래사항에 해당하는 경우에 대해서 회원가입을 승낙하지 아니하거나 이후 사전 통보 없이 취소할 수 있습니다.<br/>
                    - 회원가입 신청 시 내용을 허위로 기재한 경우<br/>
                    - 기타 규정한 제반사항을 위반하며 신청하는 경우<br/>
                    - 다른 사람의 당 어플리케이션 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 경우<br/>
                    - 당 어플리케이션를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우<br/><br/>
                    제 9 조 (회원 아이디 부여 및 변경 등)<br/>
                    1. 당 어플리케이션은 이용고객에 대하여 약관에 정하는 바에 따라 자신이 선정한 회원 아이디를 부여합니다.<br/>
                    2. 회원 아이디는 원칙적으로 변경이 불가하며 부득이한 사유로 인하여 변경 하고자 하는 경우에는 해당 아이디를 해지하고 재가입해야 합니다.<br/>
                    3. 회원은 회원가입 시 기재한 개인정보가 변경되었을 경우 온라인으로 직접 수정할 수 있습니다. 이때 변경하지 않은 정보로 인해 발생되는 문제에 대한 책임은 회원에게 있습니다.<br/>
                </p>

                <p className="paragraph">
                    제 3 장 계약 당사자의 의무<br/>
                </p>    
                <p className="paragraph">
                    제 10 조 (&quot;KIAF SEOUL VIP App&quot;의 의무)<br/>
                    1. 당 어플리케이션은 이용고객이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다.<br/>
                    2. 당 어플리케이션은 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 보호정책을 공시하고 준수합니다.<br/>
                    3. 당 어플리케이션은 회원으로부터 제기되는 의견이 합당하다고 판단될 경우에는, 적절한 조치를 취하여야 합니다.<br/>
                    4. 당 어플리케이션은 전시, 사변, 천재지변, 비상사태, 현재의 기술로는 해결이 불가능한 기술적 결함 기타 불가항력적 사유 및 이용자의 귀책사유로 인하여 발생한 이용자의 손해, 손실, 기타 모든 불이익에 대하여 어떠한 책임도 지지 않습니다.<br/>
                </p>
                <p className="paragraph">
                    제 11 조 (회원의 의무)<br/>
                    1. 이용자는 회원가입 신청 또는 회원정보 변경 시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며, 허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수 없습니다.<br/>
                    2. 당 어플리케이션이 관계법령 및 개인정보 보호정책에 의거하여 그 책임을 지는 경우를 제외하고, 회원에게 부여된 아이디의 비밀번호 관리소홀, 부정사용 등에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다.<br/>
                    3. 회원은 당 어플리케이션 및 제 3자의 지식재산권을 침해해서는 안 됩니다.<br/>
                    4. 이용자는 당 어플리케이션의 운영자, 직원, 기타 관계자를 사칭하는 행위를 하여서는 안 됩니다.<br/>
                    5. 이용자는 바이러스, 악성코드 등을 제작, 배포, 이용하여서는 아니 되고, 당 어플리케이션의 승인 없이 광고하는 행위를 하여서는 안 됩니다.<br/>
                    6. 이용자는 당 어플리케이션 및 제 3자의 명예를 훼손하거나 업무를 방해하거나, 외설적이거나, 폭력적이거나 기타 공서양속에 반하는 게시물, 쪽지, 메일 등을 게시, 전송, 배포하여서는 안 됩니다.<br/>
                </p>

                <p className="paragraph">
                    제 4 장 서비스의 이용<br/>
                </p>
                <p className="paragraph">
                    제 12 조 (서비스 이용 시간)<br/>
                    1. 회원의 이용신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 지정된 일자부터 서비스를 개시합니다.<br/>
                    2. 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는 사이트에 공시하거나 회원에게 이를 통지합니다.<br/>
                    3. 서비스의 이용은 연중무휴, 1일 24시간을 원칙으로 하며, 서비스 응대 및 처리 시간은 법정 근무일 근무시간(09:00~18:00, 법정공휴일 및 주말 제외)으로 합니다. 다만, 당 어플리케이션의 업무상 또는 기술상의 이유로 서비스가 일시 중지 될 수 있습니다. 이러한 경우 당 어플리케이션은 사전 또는 사후에 이를 공지합니다.<br/>
                    4. 회원으로 가입한 이후라도 일부 서비스 이용 시 서비스 제공자의 요구에 따라 특정회원에게만 서비스를 제공할 수 있습니다.<br/>
                    5. 서비스를 일정범위로 분할하여 각 범위별로 이용가능 시간을 별도로 정할 수 있습니다. 이 경우 그 내용을 사전에 공개합니다.<br/>
                </p>
                <p className="paragraph">
                    제 13 조 (콘텐츠 저작권)<br/>
                    1. 당 어플리케이션이 게시한 본 어플리케이션의 모든 콘텐트에 대한 저작권은 당 어플리케이션에 있습니다. 다만, 게시물의 원저작자가 별도로 있는 경우 그 출처를 명시하며 해당 게시물의 저작권은 원저작자에게 있습니다.2. KIAF SEOUL 참가 갤러리들이 직접 게시한 저작물의 저작권은 참가 갤러리에게 있습니다. 다만, 회원은 당 어플리케이션에 무료로 이용할 수 있는 권리를 허락한 것으로 봅니다.3. 당 어플리케이션 소유의 콘텐트에 대하여 제3자가 허락 없이 다른 홈페이지에 사용 또는 인용하는 것을 금지합니다.<br/>
                </p>
                <p className="paragraph">
                    제 14 조 (서비스의 변경, 중단)<br/>
                    1. 당 어플리케이션은 기술상•운영상의 필요에 의해 제공하는 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다. 당 어플리케이션의 서비스를 중단하는 경우에는 30일 전에 홈페이지에 이를 공지하되, 다만 사전에 통지할 수 없는 부득이한 사정이 있는 경우는 사후에 통지를 할 수 있습니다.<br/>
                    2. 제1항의 경우에 당 어플리케이션이 제공하는 서비스의 이용과 관련하여, 당 어플리케이션은 이용자에게 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다. 다만 당 어플리케이션의 고의 또는 중대한 과실로 인하여 발생한 손해의 경우는 제외합니다.<br/>
                </p>
                
                <p className="paragraph">
                    제 5 장 계약 해지 및 이용 제한<br/>
                </p>
                
                <p className="paragraph">
                    제 15 조 (계약 해지)<br/>
                    1. 회원은 언제든지 마이페이지 메뉴 등을 통하여 이용계약 해지 신청을 할 수 있으며, 당 어플리케이션은 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.<br/>
                    2. 회원이 계약을 해지할 경우, 관련법령 및 개인정보처리방침에 따라 당 어플리케이션이 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터는 소멸됩니다.<br/>
                </p>


                <p className="paragraph">
                    제 16 조 (서비스 이용제한)<br/>
                    1. 당 어플리케이션은 회원이 서비스 이용에 있어서 본 약관 및 관련 법령을 위반하거나, 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.<br/>
                    - 2년 이상 서비스를 이용한 적이 없는 경우<br/>
                    - 기타 정상적인 서비스 운영에 방해가 될 경우<br/>
                    2. 상기 이용제한 규정에 따라 서비스를 이용하는 회원에게 사전 통지 후 서비스 이용을 일시정지 등 제한하거나 이용계약을 해지 할 수 있습니다. 단, 불가피한 사유로 사전 통지가 불가능한 경우에는 그러하지 아니합니다.<br/>
                </p>


                <p className="paragraph">
                    제 6 장 손해배상 및 기타사항<br/>
                </p>
                <p className="paragraph">
                    제 17 조 (손해배상)<br/>
                </p>
                <p className="paragraph">
                    당 어플리케이션은 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 당 어플리케이션이 고의 또는 과실로 인한 손해발생을 제외하고는 이에 대하여 책임을 부담하지 아니합니다.<br/>
                </p>

                <p className="paragraph">
                    제 18 조 (관할 법원)<br/>
                    서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 민사 소송법상의 관할 법원에 제기합니다.<br/>
                </p>


                <p className="paragraph">
                    제 19 조 (서비스별 이용자 사전 동의 사항과 의무)<br/>
                    당 어플리케이션에 ‘기술정보를 제공하는 이용자는 자신의 기술정보에 대한 권리(특허권, 실용신안권, 디자인권, 상표권 등)를 법적으로 보호받기 위해서 필요한 조치를 스스로 취하여야 합니다. 당 어플리케이션은 이용자의 권리 보장이나 취득 등을 위한 어떠한 명목의 의무나 책임도 부담하지 않고, 이를 보장하지 않으며, 이용자 개인의 행위(당 어플리케이션의 서비스 이용 행위 일체를 포함)로 인한 어떠한 분쟁이나 어떠한 명목의 손실, 손해에 대해서도 법적 책임을 지지 아니합니다.<br/>
                </p>
                
                <p className="paragraph">
                    제 7 장 &quot; KIAF SEOUL www.kiaf.org&quot; 게시물 운영정책<br/><br/>
                </p>

                <p className="paragraph">
                    제 20 조 (운영정책)<br/>
                    &quot;KIAF SEOUL VIP App&quot; 각종 게시물에 대한 운영정책은 방송통신심의위원회의 정보통신에 관한 심의규정에 기반하며 이를 위반할 경우, &quot;KIAF SEOUL VIP App&quot; 운영정책에 의해 관련 게시물은 예고 없이 삭제, 이동될 수 있으며, 게시자(회원)는 아이디 이용제한 등 &quot;KIAF SEOUL VIP App&quot; 이용에 제한을 받을 수 있습니다.<br/>
                </p>
                <p className="paragraph">
                    제 21 조 (게시물 등록)<br/>
                    1. 주민등록번호 도용 타인의 개인정보를 이용한 활동이 발견될 경우, 해당 회원은 이용에 제한을 받을 수 있으며, 해당 계정은 본인인증 후에 정상적인 이용이 가능합니다. 또한 여러 개의 아이디를 생성하여 허위신고를 하거나, 타인 사칭을 통한 문제 발생 시, 그에 따른 이용 제한을 받을 수 있습니다.<br/>
                </p>
                <p className="paragraph">
                    제 22 조 (게시물의 저작권)<br/>
                    1. 게시물은 회원이 서비스를 이용하면서 게재한 글, 사진, 파일, 관련 링크 및 댓글 등을 말합니다.2. 회원이 서비스에 등록하는 게시물로 인하여 본인 또는 타인에게 손해 및 기타 문제가 발생하는 경우, 회원은 이에 대한 책임을 질수 있으며 또한 명예훼손이나 개인정보 유출, 저작권과 같은 법률에 위배되는 게시물 및 댓글은 관련 법안에 따라 민형사상 처벌을 받을 수 있으니 이 점 유의하여 주시기 바랍니다.<br/>
                </p>
                <p className="paragraph">
                    제 23 조 (게시물 제한규정(삭제 및 이동)<br/>
                    1. 욕설/비속어 및 분란을 조장하는 게시물- 욕설 및 비속어가 담겨있거나, 연상시키는 내용- 이유 없이 회원 간의 분란을 발생시킬 여지가 있는 내용의 게시물 또는 댓글<br/>
                    2. 게시판 및 자료실과 관련 없는 게시물- 각 주제 분야별로 나뉘어 있는 게시판 및 자료실의 주제와 관련 없는 내용<br/>
                    3. 상업성 광고 및 홍보 글에 관한 게시물<br/>
                    4. 개인정보의 유포에 관한 게시물- 타인, 혹은 본인의 메일주소/실명/사진/전화번호/주민등록번호 등의 개인정보 또는 해당 정보가 담겨 있는 내용<br/>
                    5. 확인되지 않은 소문의 유포에 관한 게시물- 공개되었을 경우, 당사자의 권리침해가 우려되는 내용<br/>
                    6. 정치적 견해 차이 및 인종/성별/지역/종교에 대한 차별, 비하하는 게시물- 인종/성별/지역/종교에 대한 차별적 발언 또는 비하하는 내용- 상이한 정치적 견해를 비하하거나 폄하하는 내용<br/>
                    7. 타인을 사칭하거나 범죄행위에 관한 게시물- 공인이나 특정이슈와 관련한 당사자 또는 지인, 주변인 등을 사칭하여 게시물을 작성하거나, &quot; KIAF SEOUL www.kiaf.org&quot; 운영자를 사칭하여 작성된 내용- 범죄와 관련 있거나 범죄를 유도하는 행위를 포함하는 내용<br/>
                    8. 저작권 위반에 관한 게시물- 기사, 사진, 동영상, 음원, 영상물 등 저작권에 의해 보호받는 콘텐츠와 관련된 내용 뉴스의 경우, 기사 내용의 전부 혹은 일부를 게시하는 경우에는 저작권에 저촉될 수 있기 때문에 링크(URL)만을 허용합니다.- 음원, 사진, 동영상 등 해당 자료에 대한 불법공유를 목적으로 작성한 내용 공유를 목적으로 이메일을 수집하는 행위도 동일하게 처리됩니다.<br/>
                    9. 악성코드/스파이웨어/혐오감 조성에 관한 게시물- 악성코드 및 스파이웨어의 유포 및 유도 관련 게시물은 사전경고 없이 제재를 받을 수 있습니다.- 시각 및 청각적으로 타인에게 혐오감을 줄 수 있는 게시물은 사전경고 없이 제재를 받을 수 있습니다.<br/>
                    10. 기타 서비스 운영에 지장을 초래할 수 있는 게시물<br/>
                </p>
                <p className="paragraph">
                    제 24 조 (이용제한)<br/>
                    1. 게시물 제한규정(3조)에 해당하는 내용을 게재하는 경우<br/>
                    2. 다량의 게시물 등록을 목적으로 의미 없는 제목을 사용하거나, 반복되는 제목을 사용하여 게재하는 경우<br/>
                    3. 비정상적인 방법으로 게시물을 등록, 조회 및 추천하는 경우 등<br/>
                </p>
                <p className="paragraph">
                    제 25 조 (게시중단 요청 서비스)<br/>
                    다른 회원의 게시물로 인하여 명예훼손, 저작권 침해 등의 피해를 입었을 경우, 운영담당자를 통해 해당 게시물에 대한 게시중단을 요청하실 수 있습니다.
                    [부 칙] (시행일) 이 약관은 2020년 07월 24일부터 적용되며, 종전 약관은 본 약관으로 대체되며, 개정된 약관의 적용일 이전 가입자도 개정된 약관의 적용을 받습니다.
                </p>
            </div>
        )
    } else {
        return (
            <div className="container py-12">
                
                <h2 className="heading-2">Terms &amp; Conditions</h2>
                <p className="paragraph">
                    These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and [KIAF SEOUL] (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the [KIAF SEOUL VIP App] application as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the &quot;Site&quot;). You agree that by accessing the application, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the application and you must discontinue use immediately. Supplemental terms and conditions or documents that may be posted on the application from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions, and you waive any right to receive specific notice of each such change.
                </p>

                <p className="paragraph">
                    It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the application after the date such revised Terms and Conditions are posted. The information provided on the application is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the application from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable. [The Site is intended for users who are at least 13 years of age.] All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the application. If you are a minor, you must have your parent or guardian read and agree to these Terms and Conditions prior to you using the application.
                </p>
  
                <p className="paragraph">
                    INTELLECTUAL PROPERTY RIGHTS<br/>
                    Unless otherwise indicated, the application is our proprietary property and all source code, databases, functionality, software, application designs, audio, video, text, photographs, and graphics on the application (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of South Korea , foreign jurisdictions, and international conventions. The Content and the Marks are provided on the application is for personal use only. Except as expressly provided in these Terms and Conditions, no part of the application and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.Provided that you are eligible to use the application, you are granted a limited license to access and use the application and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the application, the Content and the Marks.
                </p>
                
                <p className="paragraph">
                    USER REPRESENTATIONS<br/>
                    By using the application, you represent and warrant that: <br/>
                    [(1) all registration information you submit will be true, accurate, current, and complete;
                    (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;] <br/>
                    (3) you have the legal capacity and you agree to comply with these Terms and Conditions; <br/>
                    [(4) you are not under the age of 13;] <br/>
                    (5) not a minor in the jurisdiction in which you reside[, or if a minor, you have received parental permission to use the application]; <br/>
                    (6) you will not access the application through automated or non-human means, whether through a bot, script, or otherwise; <br/>
                    (7) you will not use the application for any illegal or unauthorized purpose; <br/>
                    (8) your use of the application will not violate any applicable law or regulation.<br/>
                    If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the application (or any portion thereof). <br/>
                </p>
                <p className="paragraph">
                    USER REGISTRATION<br/>
                    You may be required to register with the application. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                </p>
                
                <p className="paragraph">
                    PROHIBITED ACTIVITIES<br/>

                    You may not access or use the application for any purpose other than that for which we make the application available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. <br/>

                    As a user of the application, you agree not to:<br/>
                    1. systematically retrieve data or other content from the application to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.<br/>
                    2. make any unauthorized use of the application, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.<br/>
                    3. use a buying agent or purchasing agent to make purchases on the application.<br/>
                    4. use the application to advertise or offer to sell goods and services.<br/>
                    5. circumvent, disable, or otherwise interfere with security-related features of the application, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the application and/or the Content contained therein.
                    6. engage in unauthorized framing of or linking to the application.<br/>
                    7. trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords;<br/>
                    8. make improper use of our support services or submit false reports of abuse or misconduct.<br/>
                    9. interfere with, disrupt, or create an undue burden on the application or the networks or services connected to the application.<br/>
                    10. attempt to impersonate another user or person or use the username of another user.<br/>
                    11. sell or otherwise transfer your profile. <br/>
                    12. use any information obtained from the application in order to harass, abuse, or harm another person.<br/>
                    13. use the application as part of any effort to compete with us or otherwise use the application and/or the Content for any revenue-generating endeavor or commercial enterprise.<br/>
                    14. decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the application.<br/>
                    15. attempt to bypass any measures of the application designed to prevent or restrict access to the application, or any portion of the application.<br/>
                    16. harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the application to you.<br/>
                    17. delete the copyright or other proprietary rights notice from any Content.<br/>
                    18. copy or adapt the application’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.<br/>
                    19. upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the application or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the application.<br/>
                    20. upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).<br/>
                    21. except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the application, or using or launching any unauthorized script or other software.<br/>
                    22. disparage, tarnish, or otherwise harm, in our opinion, us and/or the application.<br/>
                    23. use the application in a manner inconsistent with any applicable laws or regulations.
                </p>
                <p className="paragraph">
                    USER GENERATED CONTRIBUTIONS<br/>
                    The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the application, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, &quot;Contributions&quot;).<br/><br/>

                    Contributions may be viewable by other users of the applicaion and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:<br/><br/>

                    1. the creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.<br/>
                    2. you are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the application, and other users of the application to use your Contributions in any manner contemplated by the application and these Terms and Conditions.<br/>
                    3. you have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the application and these Terms and Conditions.<br/>
                    4.your Contributions are not false, inaccurate, or misleading.<br/>
                    5. your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.<br/>
                    6. your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).<br/>
                    7. your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.<br/>
                    8. your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another.<br/>
                    9. your Contributions do not violate any applicable law, regulation, or rule.<br/>
                    10. your Contributions do not violate the privacy or publicity rights of any third party.<br/>
                    11. your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.<br/>
                    12. your Contributions do not violate any federal or state law concerning child pornography, or otherwise intended to protect the health or well-being of minors;<br/>
                    13. your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.<br/>
                    14. your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms and Conditions, or any applicable law or regulation.<br/><br/>

                    Any use of the application in violation of the foregoing violates these Terms and Conditions and may result in, among other things, termination or suspension of your rights to use the application.
                </p>

                <p className="paragraph">
                
                    CONTRIBUTION LICENSE<br/>

                    By posting your Contributions to any part of the application [or making Contributions accessible to the application by linking your account from the application to any of your social networking accounts], you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may occur in any media formats and through any media channels. <br/>

                    This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions. <br/>

                    We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the application. You are solely responsible for your Contributions to the application and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions. We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any
                </p>
                <p className="paragraph">
                    SITE MANAGEMENT<br/>

                    We reserve the right, but not the obligation, to:&nbsp;<br/>

                    (1) monitor the application for violations of these Terms and Conditions; <br/>

                    (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms and Conditions, including without limitation, reporting such user to law enforcement authorities; <br/>

                    (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; <br/>

                    (4) in&nbsp;our sole discretion and without limitation, notice, or liability, to remove from the application or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; <br/>

                    (5) otherwise manage the application in a manner designed to protect our rights and property and to facilitate the proper functioning of the application.
                </p>
                <p className="paragraph">
                    PRIVACY POLICY<br/>
                    We care about data privacy and security. Please review our Privacy Policy [CLICK HERE]/posted on the application]. By using the application, you agree to be bound by our Privacy Policy, which is incorporated into these Terms and Conditions. Please be advised the application is hosted in the United States. If you access the application from the European Union, Asia, or any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the application, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States. <br/>

                    [Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children’s Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the application as quickly as is reasonably practical.]<br/>
                </p>
                <p className="paragraph">
                    COPYRIGHT INFRINGEMENTS<br/>

                    We respect the intellectual property rights of others. If you believe that any material available on or through the application infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a &quot;Notification&quot;). A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification.
                </p>
                <p className="paragraph">
                    CORRECTIONS<br/>
                    There may be information on the application that contains typographical errors, inaccuracies, or omissions that may relate to the application, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the application at any time, without prior notice.
                </p>
                <p className="paragraph">
                    INDEMNIFICATION<br/>
                    You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: <br/>
                    (1) [your Contributions]; <br/>
                    (2) use of the application; <br/>
                    (3) breach of these Terms and Conditions; <br/>
                    (4) any breach of your representations and warranties set forth in these Terms and Conditions; <br/>
                    (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or <br/>
                    (6) any overt harmful act toward any other user of the application with whom you connected via the application. <br/>

                    Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.&nbsp;
                </p>
                
                <p className="paragraph">
                    USER DATA<br/>

                    We will maintain certain data that you transmit to the application for the purpose of managing the application, as well as data relating to your use of the application. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the application.
                </p>

                <p className="paragraph">
                    MISCELLANEOUS<br/>

                    These Terms and Conditions and any policies or operating rules posted by us on the application constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms and Conditions shall not operate as a waiver of such right or provision.

                    These Terms and Conditions operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.

                    If any provision or part of a provision of these Terms and Conditions is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms and Conditions and does not affect the validity and enforceability of any remaining provisions.

                    There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms and Conditions or use of the application. You agree that these Terms and Conditions will not be construed against us by virtue of having drafted them.

                    You hereby waive any and all defenses you may have based on the electronic form of these Terms and Conditions and the lack of signing by the parties hereto to execute these Terms and Conditions.
                </p>
                <p className="paragraph">
                    CONTACT US<br/>

                    In order to resolve a complaint regarding the application or to receive further information regarding use of the application, please contact us at: <br/>

                    Galleries Association of Korea<br/>
                    102-407, 461, Samil-daero, Jongno-gu, Seoul, 03147, Korea<br/>
                    +82 733 3706<br/>
                    +82 02 733 3701<br/>
                    kiaf@kiaf.org
                </p>
            </div>
        )
    }
    
}