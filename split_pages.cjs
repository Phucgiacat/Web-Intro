const fs = require('fs');
const path = require('path');

const baseHtml = fs.readFileSync('terms.html', 'utf8');

// The new sidebar TOC to replace the old one
const newToc = `
          <h3>Mục lục</h3>
          <ul>
            <li><a href="terms.html">Điều khoản Dịch vụ</a></li>
            <li><a href="privacy.html">Chính sách Bảo mật</a></li>
            <li><a href="delivery.html">Chính sách Bàn giao & Kích hoạt</a></li>
            <li><a href="payment.html">Chính sách Thanh toán</a></li>
            <li><a href="refund.html">Chính sách Hoàn tiền</a></li>
          </ul>
`;

// Helper to build a page
function buildPage(title, contentHtml) {
    let html = baseHtml;
    // Replace the title
    html = html.replace(/<h1>.*?<\/h1>/, `<h1>${title.toUpperCase()}</h1>`);
    // Replace TOC
    html = html.replace(/<aside class="toc-sidebar">[\s\S]*?<\/aside>/, `<aside class="toc-sidebar">\n        <div class="toc-sticky">\n${newToc}\n        </div>\n      </aside>`);
    // Replace Content
    html = html.replace(/<div class="privacy-content">[\s\S]*?<!-- privacy-layout end padding -->/g, `<div class="privacy-content">\n${contentHtml}\n      </div>\n      <!-- privacy-layout end padding -->`);
    // Replace footer links globally in the whole HTML
    html = html.replace(/href="terms\.html#payment"/g, 'href="payment.html"');
    html = html.replace(/href="terms\.html#delivery"/g, 'href="delivery.html"');
    html = html.replace(/href="terms\.html#refund"/g, 'href="refund.html"');
    
    return html;
}

// 1. terms.html content
const termsContent = `
          <p class="intro-text">
            Cảm ơn bạn đã sử dụng Neo AI!<br><br>
            Các Điều khoản này tạo thành một thỏa thuận giữa bạn và TRUNG VIỆT., LTD, và chúng bao gồm Điều khoản dịch vụ của chúng tôi và các quy định quan trọng để giải quyết tranh chấp thông qua trọng tài. Thông qua việc sử dụng Dịch vụ của chúng tôi, bạn đồng ý với các Điều khoản này.
            Chính sách quyền riêng tư của chúng tôi giải thích cách chúng tôi thu thập và sử dụng thông tin cá nhân. Mặc dù chính sách đó không thuộc các Điều khoản này nhưng vẫn là một tài liệu quan trọng mà bạn nên đọc.
          </p>

          <section id="general_service" class="policy-section">
            <h2>Điều khoản Dịch vụ (Terms of Service)</h2>
            <p>Chào mừng bạn đến với Neo AI. Việc đăng ký tài khoản và sử dụng dịch vụ của chúng tôi đồng nghĩa với việc bạn chấp thuận các điều khoản sau:</p>
            <p><strong>Mô tả Dịch vụ:</strong> Neo AI là một nền tảng trí tuệ nhân tạo hoạt động theo mô hình phần mềm dịch vụ (SaaS), cung cấp các tính năng nâng cao thông qua gói thuê bao trả phí.</p>
            <p><strong>Thanh toán và Gia hạn:</strong> Các gói thuê bao sẽ được tự động gia hạn vào cuối mỗi chu kỳ. Bạn có thể hủy tính năng gia hạn tự động bất kỳ lúc nào tại khu vực quản lý tài khoản.</p>
            <p><strong>Quyền Sở hữu Trí tuệ:</strong> Mọi công nghệ và thương hiệu liên quan đến Neo AI đều thuộc quyền sở hữu của chúng tôi.</p>
          </section>

          <section id="about" class="policy-section">
            <h2>1. Về chúng tôi</h2>
            <p>TRUNG VIỆT., LTD là một công ty nghiên cứu và triển khai trí tuệ nhân tạo (AI). Sứ mệnh của chúng tôi là đảm bảo rằng trí tuệ nhân tạo mang lại lợi ích cho xã hội. Để biết thêm thông tin về NEO AI và TRUNG VIET ., LTD, xin vui lòng truy cập <a href="https://neoai.ai.vn">https://neoai.ai.vn</a> và <a href="https://neoai.io.vn">https://neoai.io.vn</a></p>
          </section>

          <section id="registration" class="policy-section">
            <h2>2. Đăng ký và truy cập</h2>
            <p><strong>Độ tuổi tối thiểu:</strong> Bạn phải đủ 15 tuổi hoặc ở độ tuổi tối thiểu theo luật ở quốc gia của bạn để đồng ý sử dụng Dịch vụ. Nếu dưới 18 tuổi, bạn phải có sự cho phép của cha mẹ hoặc người giám hộ hợp pháp để sử dụng Dịch vụ.</p>
            <p><strong>Đăng ký:</strong> Bạn phải cung cấp thông tin chính xác và đầy đủ để đăng ký tài khoản nhằm sử dụng Dịch vụ của chúng tôi. Bạn không được chia sẻ thông tin đăng nhập tài khoản của mình hoặc đưa tài khoản của bạn cho bất kỳ ai khác sử dụng và chịu trách nhiệm về mọi hoạt động diễn ra trong tài khoản của bạn. Nếu bạn tạo tài khoản hoặc sử dụng Dịch vụ thay mặt cho một cá nhân hoặc tổ chức khác, thì bạn phải có quyền thay họ chấp nhận các Điều khoản này.</p>
          </section>

          <section id="usage" class="policy-section">
            <h2>3. Sử dụng Dịch vụ của chúng tôi</h2>
            <p><strong>Bạn có thể làm những gì:</strong> Miễn là bạn tuân thủ các Điều khoản này, bạn có thể truy cập và sử dụng Dịch vụ của chúng tôi. Khi sử dụng Dịch vụ của chúng tôi, bạn phải tuân thủ tất cả các luật hiện hành cũng như Chính sách chia sẻ và xuất bản, Chính sách sử dụng và mọi tài liệu, nguyên tắc hoặc chính sách khác mà chúng tôi cung cấp cho bạn.</p>
            <p><strong>Những việc bạn không được phép làm:</strong> Bạn không được sử dụng Dịch vụ của chúng tôi cho bất kỳ hoạt động trái phép, có hại hoặc lạm dụng nào. Ví dụ: bạn không được:</p>
            <ul>
              <li>Sử dụng Dịch vụ của chúng tôi theo cách vi phạm, chiếm đoạt hoặc vi phạm quyền của bất kỳ ai.</li>
              <li>Sửa đổi, sao chép, cho thuê, bán hoặc phân phối bất kỳ Dịch vụ nào của chúng tôi.</li>
              <li>Cố gắng hoặc hỗ trợ một người bất kỳ thực hiện kỹ thuật đảo ngược, dịch ngược hoặc khám phá mã nguồn hay các thành phần nền trong Dịch vụ của chúng tôi, bao gồm cả các mô hình, thuật toán hoặc hệ thống của chúng tôi (ngoại trừ ở mức độ hạn chế này bị cấm theo luật hiện hành).</li>
              <li>Trích xuất dữ liệu hoặc Thông tin đầu ra một cách tự động hoặc theo chương trình.</li>
              <li>Tuyên bố rằng Thông tin đầu ra là do con người tạo ra mặc dù thực tế không phải vậy.</li>
              <li>Can thiệp hoặc làm gián đoạn Dịch vụ của chúng tôi, bao gồm cả việc tránh né mọi giới hạn hoặc hạn chế về số lượng yêu cầu gửi đến hệ thống hoặc bỏ qua mọi biện pháp bảo vệ hoặc biện pháp giảm thiểu để có sự an toàn mà chúng tôi áp dụng cho Dịch vụ của mình.</li>
              <li>Sử dụng Thông tin đầu ra để phát triển các mô hình cạnh tranh với NEO AI.</li>
            </ul>
            <p><strong>Phần mềm:</strong> Dịch vụ của chúng tôi có thể cho phép bạn tải xuống phần mềm, chẳng hạn như ứng dụng di động, có thể cập nhật tự động để đảm bảo bạn đang sử dụng phiên bản mới nhất.</p>
            <p><strong>Ý kiến phản hồi:</strong> Chúng tôi coi trọng ý kiến phản hồi của bạn và bạn đồng ý rằng chúng tôi có thể sử dụng nó mà không phải chịu hạn chế hay bồi thường cho bạn.</p>
          </section>

          <section id="content" class="policy-section">
            <h2>4. Nội dung</h2>
            <p><strong>Nội dung của bạn:</strong> Bạn có thể cung cấp Đầu vào cho Dịch vụ (“Thông tin đầu vào”) và nhận Thông tin đầu ra từ Dịch vụ dựa trên Đầu vào (“Thông tin đầu ra”). Thông tin đầu vào và Thông tin đầu ra được gọi chung là “Nội dung.” Bạn chịu trách nhiệm về Nội dung, gồm cả việc đảm bảo rằng Nội dung đó không vi phạm bất kỳ luật hiện hành nào hoặc các Điều khoản này. Bạn cam kết và đảm bảo rằng bạn có tất cả các quyền, giấy phép và sự cho phép cần thiết để cung cấp Thông tin đầu vào cho Dịch vụ của chúng tôi.</p>
            <p><strong>Quyền sở hữu nội dung:</strong> Giữa bạn và TRUNG VIỆT và ở mức độ được luật pháp hiện hành cho phép, bạn (a) giữ quyền sở hữu đối với Thông tin đầu vào và (b) sở hữu Thông tin đầu ra. Bằng tài liệu này, chúng tôi chuyển giao cho bạn tất cả các quyền, quyền sở hữu và lợi ích của chúng tôi, nếu có, đối với Thông tin đầu ra.</p>
            <p><strong>Sự tương đồng của nội dung:</strong> Do tính chất của Dịch vụ của chúng tôi và trí tuệ nhân tạo nói chung, Thông tin đầu ra có thể không phải là duy nhất và những người dùng khác có thể nhận được thông tin đầu ra tương tự từ Dịch vụ của chúng tôi. Sự chuyển giao mà chúng tôi đề cập ở trên không áp dụng cho Thông tin đầu ra của người dùng khác hoặc bất kỳ Thông tin đầu ra nào của bên thứ ba.</p>
            <p><strong>Việc sử dụng Nội dung của chúng tôi:</strong> Chúng tôi có thể sử dụng Nội dung của bạn để cung cấp, duy trì, phát triển và cải thiện Dịch vụ của chúng tôi, tuân thủ luật pháp hiện hành, thực thi các điều khoản và chính sách của chúng tôi, cũng như duy trì sự an toàn cho Dịch vụ của chúng tôi.</p>
            <p><strong>Tính chính xác:</strong> Trí tuệ nhân tạo và công nghệ máy học là những lĩnh vực nghiên cứu đang phát triển nhanh chóng. Chúng tôi không ngừng nỗ lực cải thiện Dịch vụ của mình để làm cho chúng chính xác, đáng tin cậy, an toàn và có lợi hơn. Do tính chất xác suất của một số mô hình học máy cũng như giới hạn của dữ liệu đầu vào, trong một số trường hợp, việc sử dụng Dịch vụ của chúng tôi có thể dẫn đến Thông tin đầu ra không hoàn toàn phản ánh chính xác con người, địa điểm hoặc sự kiện thực tế.</p>
            <p>Khi bạn sử dụng Dịch vụ của chúng tôi, bạn hiểu và đồng ý:</p>
            <ul>
              <li>Thông tin đầu ra có thể không phải lúc nào cũng chính xác. Bạn không nên dựa vào Thông tin đầu ra từ Dịch vụ của chúng tôi như một nguồn thông tin xác thực duy nhất hoặc để thay thế cho lời tư vấn chuyên nghiệp.</li>
              <li>Bạn phải đánh giá Thông tin đầu ra để đảm bảo mức độ chính xác và phù hợp cho trường hợp sử dụng của mình.</li>
              <li>Bạn không được sử dụng bất kỳ Thông tin đầu ra nào liên quan đến một người cho bất kỳ mục đích nào có thể gây ra tác động pháp lý hoặc đáng kể đến người đó, chẳng hạn như đưa ra các quyết định về tín dụng, giáo dục, việc làm, nhà ở, bảo hiểm, pháp lý, y tế hoặc các quyết định quan trọng khác về họ.</li>
              <li>Dịch vụ của chúng tôi có thể cung cấp Thông tin đầu ra không đầy đủ, không tuyệt đối chính xác. Thông tin này không thể hiện quan điểm của NEO AI.</li>
            </ul>
          </section>

          <section id="ip" class="policy-section">
            <h2>5. Quyền sở hữu trí tuệ của chúng tôi</h2>
            <p>Chúng tôi sở hữu mọi quyền, quyền sở hữu và lợi ích đối với Dịch vụ. Bạn chỉ có thể sử dụng tên và logo của chúng tôi theo Hướng dẫn Thương hiệu của chúng tôi.</p>
          </section>

          <section id="paid" class="policy-section">
            <h2>6. Tài khoản trả phí</h2>
            <p><strong>Thanh toán:</strong> Nếu bạn mua bất kỳ Dịch vụ nào, bạn sẽ cung cấp thông tin thanh toán đầy đủ và chính xác, bao gồm cả phương thức thanh toán hợp lệ. Đối với các gói đăng ký trả phí, chúng tôi sẽ tự động tính phí vào phương thức thanh toán của bạn theo mỗi kỳ gia hạn đã thỏa thuận cho đến khi bạn hủy. Bạn chịu trách nhiệm về tất cả các loại thuế hiện hành và chúng tôi sẽ tính thuế khi được yêu cầu. Nếu bạn không thể hoàn tất thanh toán, chúng tôi có thể hạ cấp tài khoản của bạn hoặc đình chỉ quyền truy cập của bạn vào Dịch vụ của chúng tôi cho đến khi nhận được thanh toán.</p>
            <p><strong>Hủy:</strong> Bạn có thể hủy gói đăng ký trả phí của mình bất cứ lúc nào. Các khoản thanh toán không được hoàn lại, trừ khi pháp luật yêu cầu.</p>
            <p><strong>Thay đổi:</strong> Chúng tôi có thể thay đổi mức giá tùy từng thời điểm. Nếu tăng giá gói đăng ký, chúng tôi sẽ thông báo cho bạn trước ít nhất 30 ngày và mọi quyết định tăng giá sẽ có hiệu lực vào lần gia hạn tiếp theo của bạn để bạn có thể hủy nếu không đồng ý với việc tăng giá.</p>
          </section>

          <section id="termination" class="policy-section">
            <h2>7. Chấm dứt và đình chỉ</h2>
            <p><strong>Chấm dứt:</strong> Bạn có quyền ngừng sử dụng Dịch vụ của chúng tôi bất cứ lúc nào. Chúng tôi có quyền đình chỉ hoặc chấm dứt quyền truy cập của bạn vào Dịch vụ của chúng tôi hoặc xóa tài khoản của bạn nếu chúng tôi xác định rằng:</p>
            <ul>
              <li>Bạn đã vi phạm các Điều khoản này hoặc Chính sách sử dụng của chúng tôi.</li>
              <li>Chúng tôi phải làm như vậy để tuân thủ pháp luật.</li>
              <li>Việc bạn sử dụng Dịch vụ của chúng tôi có thể gây ra rủi ro hoặc tổn hại cho NeoAI, người dùng của chúng tôi hoặc bất kỳ người nào khác.</li>
            </ul>
            <p>Chúng tôi cũng có thể chấm dứt tài khoản của bạn nếu tài khoản đó không hoạt động trong hơn một năm và bạn không có tài khoản trả phí. Nếu vậy thì chúng tôi sẽ thông báo trước cho bạn.</p>
            <p><strong>Ngừng cung cấp dịch vụ:</strong> Chúng tôi có thể quyết định ngừng cung cấp Dịch vụ của mình, nhưng trong trường hợp đó, chúng tôi sẽ thông báo trước cho bạn và hoàn tiền cho mọi Dịch vụ trả trước chưa sử dụng.</p>
          </section>

          <section id="disclaimer" class="policy-section">
            <h2>8. Tuyên bố miễn trừ trách nhiệm bảo đảm</h2>
            <p>CÁC DỊCH VỤ CỦA CHÚNG TÔI ĐƯỢC CUNG CẤP “NGUYÊN TRẠNG.” NGOẠI TRỪ TRONG PHẠM VI PHÁP LUẬT NGĂN CẤM, CHÚNG TÔI VÀ CÁC CÔNG TY LIÊN KẾT CÙNG NGƯỜI CẤP PHÉP CỦA CHÚNG TÔI KHÔNG ĐẢM BẢO (RÕ RÀNG, NGỤ Ý, THEO LUẬT ĐỊNH HOẶC CÁCH KHÁC) ĐỐI VỚI CÁC DỊCH VỤ, VÀ TỪ CHỐI TẤT CẢ CÁC BẢO ĐẢM BAO GỒM NHƯNG KHÔNG GIỚI HẠN Ở BẢO ĐẢM VỀ KHẢ NĂNG BÁN HÀNG, PHÙ HỢP CHO MỘT MỤC ĐÍCH CỤ THỂ, CHẤT LƯỢNG THỎA ĐÁNG, KHÔNG VI PHẠM VÀ TẬN HƯỞNG YÊN TĨNH, CŨNG NHƯ BẤT KỲ BẢO ĐẢM NÀO PHÁT SINH TỪ BẤT KỲ QUÁ TRÌNH GIAO DỊCH HOẶC SỬ DỤNG TRONG THƯƠNG MẠI NÀO. CHÚNG TÔI KHÔNG ĐẢM BẢO RẰNG CÁC DỊCH VỤ SẼ KHÔNG BỊ GIÁN ĐOẠN, CHÍNH XÁC HOẶC KHÔNG CÓ LỖI, HAY BẤT KỲ NỘI DUNG NÀO SẼ ĐƯỢC BẢO MẬT HOẶC KHÔNG BỊ MẤT HOẶC THAY ĐỔI.</p>
            <p>BẠN CHẤP NHẬN VÀ ĐỒNG Ý RẰNG BẠN TỰ CHỊU RỦI RO KHI SỬ DỤNG MỌI THÔNG TIN ĐẦU RA TỪ DỊCH VỤ CỦA CHÚNG TÔI VÀ BẠN SẼ KHÔNG DỰA VÀO THÔNG TIN ĐẦU RA NHƯ MỘT NGUỒN DỮ LIỆU DUY NHẤT HAY THÔNG TIN THỰC TẾ, HOẶC ĐỂ THAY THẾ CHO LỜI KHUYÊN CHUYÊN NGHIỆP.</p>
          </section>

          <section id="liability" class="policy-section">
            <h2>9. Giới hạn trách nhiệm pháp lý</h2>
            <p>CẢ CHÚNG TÔI VÀ BẤT KỲ CHI NHÁNH HOẶC BÊN CẤP PHÉP NÀO CỦA CHÚNG TÔI SẼ KHÔNG CHỊU TRÁCH NHIỆM VỀ BẤT KỲ THIỆT HẠI GIÁN TIẾP, NGẪU NHIÊN, ĐẶC BIỆT, HẬU QUẢ HOẶC MẪU MỰC NÀO, BAO GỒM THIỆT HẠI DO MẤT LỢI NHUẬN, THIỆN CHÍ, SỬ DỤNG HOẶC DỮ LIỆU HOẶC TỔN THẤT KHÁC, NGAY CẢ KHI CHÚNG TÔI ĐÃ ĐƯỢC THÔNG BÁO VỀ KHẢ NĂNG XẢY RA THIỆT HẠI ĐÓ. TRÁCH NHIỆM TỔNG HỢP CỦA CHÚNG TÔI THEO CÁC ĐIỀU KHOẢN NÀY SẼ KHÔNG VƯỢT QUÁ SỐ TIỀN LỚN NHẤT MÀ BẠN ĐÃ THANH TOÁN CHO DỊCH VỤ DẪN ĐẾN KHIẾU NẠI TRONG 12 THÁNG TRƯỚC KHI PHÁT SINH TRÁCH NHIỆM PHÁP LÝ. NHỮNG HẠN CHẾ TRONG PHẦN NÀY CHỈ ÁP DỤNG TRONG CHỪNG MỰC TỐI ĐA ĐƯỢC PHÉP THEO PHÁP LUẬT HIỆN HÀNH.</p>
          </section>

          <section id="dispute" class="policy-section">
            <h2>10. Giải quyết tranh chấp</h2>
            <p>Mọi tranh chấp phát sinh từ hoặc liên quan đến việc sử dụng dịch vụ của Neo AI trước hết sẽ được giải quyết thông qua thương lượng. Trường hợp không đạt được thỏa thuận, tranh chấp sẽ được giải quyết tại Trung tâm Trọng tài thương mại hợp pháp tại Việt Nam (ví dụ: VIAC) hoặc Tòa án có thẩm quyền tại Việt Nam theo quy định của pháp luật hiện hành.</p>
          </section>
`;

const deliveryContent = `
          <section id="delivery" class="policy-section">
            <h2>Chính sách Bàn giao & Kích hoạt</h2>
            <p><strong>Bản chất Dịch vụ:</strong> Neo AI là một dịch vụ kỹ thuật số, không có sản phẩm vật lý nào được giao nhận.</p>
            <p><strong>Quy trình Kích hoạt:</strong> Quyền truy cập các tính năng trả phí sẽ được kích hoạt tự động trên tài khoản của bạn ngay sau khi chúng tôi xác nhận giao dịch thanh toán thành công.</p>
            <p><strong>Thời gian:</strong> Quá trình này diễn ra gần như tức thời, thông thường trong vòng vài phút.</p>
            <p><strong>Xác nhận:</strong> Hệ thống sẽ tự động gửi một email xác nhận thanh toán và kích hoạt dịch vụ thành công đến địa chỉ email bạn đã đăng ký.</p>
          </section>
`;

const paymentContent = `
          <section id="payment" class="policy-section">
            <h2>Chính sách Thanh toán</h2>
            <p><strong>Phương thức được Chấp nhận:</strong> Chúng tôi chấp nhận thanh toán qua các đối tác cổng thanh toán an toàn, bao gồm:</p>
            <ul>
              <li>Thẻ Tín dụng/Ghi nợ (Visa, Mastercard).</li>
              <li>Các loại Ví điện tử phổ biến (Momo, ZaloPay, VNPAY-QR).</li>
              <li>Chuyển khoản Ngân hàng trực tuyến.</li>
            </ul>
            <p><strong>Bảo mật Thanh toán:</strong> Chúng tôi không lưu trữ thông tin thẻ của bạn. Mọi giao dịch được mã hóa và xử lý bởi các bên thứ ba tuân thủ tiêu chuẩn bảo mật cao nhất.</p>
            <p><strong>Hóa đơn:</strong> Hóa đơn điện tử cho mỗi lần thanh toán sẽ được gửi tự động đến email của bạn.</p>
          </section>
`;

const refundContent = `
          <section id="refund" class="policy-section">
            <h2>Chính sách Hoàn tiền</h2>
            <p><strong>Nguyên tắc chung:</strong> Do đặc tính của dịch vụ kỹ thuật số và việc cấp quyền truy cập ngay lập tức, các khoản phí thuê bao đã thanh toán là không được hoàn lại.</p>
            <p><strong>Hủy Dịch vụ:</strong> Bạn có thể hủy gói thuê bao của mình bất cứ lúc nào. Việc hủy sẽ ngăn chặn các khoản phí trong tương lai. Bạn sẽ tiếp tục được sử dụng các tính năng đã trả phí cho đến khi kết thúc chu kỳ thanh toán hiện tại.</p>
            <p>Bạn có thể hủy gói thuê bao Neo AI của mình bất cứ lúc nào. Việc hủy sẽ có hiệu lực vào cuối chu kỳ thanh toán hiện tại của bạn. Xin lưu ý rằng các khoản phí đã thanh toán là không được hoàn lại, trừ khi có yêu cầu bởi pháp luật.</p>
          </section>
`;

// Save files
fs.writeFileSync('terms.html', buildPage('Điều khoản Dịch vụ', termsContent));
fs.writeFileSync('delivery.html', buildPage('Chính sách Bàn giao & Kích hoạt', deliveryContent));
fs.writeFileSync('payment.html', buildPage('Chính sách Thanh toán', paymentContent));
fs.writeFileSync('refund.html', buildPage('Chính sách Hoàn tiền', refundContent));

// Update index.html and privacy.html footer links
['index.html', 'privacy.html'].forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/href="terms\.html#payment"/g, 'href="payment.html"');
    html = html.replace(/href="terms\.html#delivery"/g, 'href="delivery.html"');
    html = html.replace(/href="terms\.html#refund"/g, 'href="refund.html"');
    // Also replace privacy TOC if it exists
    html = html.replace(/<aside class="toc-sidebar">[\s\S]*?<\/aside>/, `<aside class="toc-sidebar">\n        <div class="toc-sticky">\n${newToc}\n        </div>\n      </aside>`);
    fs.writeFileSync(file, html);
});

// Update vite.config.js
let viteConfig = fs.readFileSync('vite.config.js', 'utf8');
viteConfig = viteConfig.replace(/terms: resolve\(__dirname, 'terms\.html'\)/, "terms: resolve(__dirname, 'terms.html'),\n        delivery: resolve(__dirname, 'delivery.html'),\n        payment: resolve(__dirname, 'payment.html'),\n        refund: resolve(__dirname, 'refund.html')");
fs.writeFileSync('vite.config.js', viteConfig);

console.log('Split pages successfully!');
