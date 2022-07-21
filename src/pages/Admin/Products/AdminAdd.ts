import axios from "axios";
import { createProduct } from "../../../api/product";
import AdminHeader from "../../../components/Header/Admin"
import Sidebar from "../../../components/Sidebar"
import Product from "../../../models/product";

const AdminProductAdd = {
    render: async () => {
        const { data: category } = await axios.get('http://localhost:3001/categoryProducts');        
        return /*html*/`
        ${AdminHeader.render()}
        <div class="flex mt-4 divide-x">
            <div class="w-[250px] flex-none pt-3 pl-3">
                ${Sidebar.render()}
            </div>
            <div class="grow px-4">
                <div>
                <h3 class="text-2xl mb-3"><b>Thêm mới sản phẩm</b></h3>
                <form id="Form">
                <div class="grid grid-cols-3 gap-8">
                    <div class="">
                        <div class="flex flex-col justify-center items-center border rounded-md h-[250px]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                        <div class="mt-4">Thêm ảnh</div>
                        </div>
                        <label for="">Mô tả ngắn</label>
                        <textarea class="w-full border"></textarea>
                    </div>
                    <div class="col-span-2">
                        <div class="border-b pb-2">Thông tin sản phẩm</div>
                        <div class="flex flex-col mt-4">
                            <label for="">Tên sản phẩm:</label>
                            <input id="name" name="NameProduct" type="text" placeholder="Tên sản phẩm" class="w-full border rounded-sm h-10">
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="flex flex-col">
                                <label for="">Giá gốc:</label>
                                <input id="originalPrice" name="originalPrice" type="text" placeholder="Giá gốc" class="w-full border rounded-sm h-10">
                            </div>
                            <div class="flex flex-col">
                                <label for="">Giá khuyến mãi:</label>
                                <input id="saleOffPrice" name="saleOffPrice" type="text" placeholder="Giá khuyến mãi" class="w-full border rounded-sm h-10">
                            </div>
                        </div>
                        <div class="flex flex-col mt-4">
                            <label for="default" class="block mb-2 font-medium text-gray-900 dark:text-gray-400">Danh mục sản phẩm</label>
                            <select id="category" name="category" class="bg-gray-50 border border-gray-300 w-[525px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                ${category.map(item => /* html */ `
                                    <option value="${item.name}">${item.name}</option>
                                `).join("")}
                            </select>
                        </div>
                        <div class="flex flex-col mt-4">
                            <label for="">Đặc điểm nổi bật</label>
                            <textarea id="feature" name="feature" class="w-full border"></textarea>
                        </div>
                        <div class="flex flex-col mt-4">
                            <label for="">Mô tả dài</label>
                            <textarea id="description" name="description" class="w-full border"></textarea>
                        </div>
                        <button class="btn btn-info w-[100px] mt-4 text-white" id="add-product-btn">Thêm mới</button>
                    </div>
                    </form>
                </div>
            </div>        
            </div>
        </div>
        `
    },
    afterRender: async () => {
        $(function () {
            (<any>$("#Form")).validate({
              rules: {
                NameProduct: {
                  required: true,
                  minlength: 5,
                },
                originalPrice: {
                  required: true,
                },
                saleOffPrice: {
                  required: true,
                },
                description: {
                  required: true,
                },
                feature: {
                  required: true,
                },
                category: {
                  required: true,
                  // accept: "audio/*"
                },
              },
              messages: {
                NameProduct: {
                  required: "không được bỏ trống",
                  minlength: "trên 5 ký tự",
                },
                originalPrice: {
                  required: "không được bỏ trống",
                },
                saleOffPrice: {
                  required: "không được bỏ trống",
                },
                feature: {
                  required: "không được bỏ trống",
                },
                description: {
                  required: "không được bỏ trống",
                },
                category: {
                  required: "không được bỏ trống",
                },
              },
            });
          });
        const addProductBtn = document.querySelector('#add-product-btn');
        addProductBtn?.addEventListener('click', async (e) => 
        {
            e.preventDefault()
            if ((<any>$("#Form")).valid()) {
            const name = document.querySelector('#name')?.value
            const originalPrice = document.querySelector('#originalPrice')?.value
            const saleOffPrice = document.querySelector('#saleOffPrice')?.value        
            const category = document.querySelector('#category')?.value
            const feature = document.querySelector('#feature')?.value
            const description = document.querySelector('#description')?.value
            const product = new Product(name, originalPrice, saleOffPrice, category, feature, description)
            try {
                const data = await createProduct(product)
                alert('Thêm mới thành công')
                location.href = '/admin'
            } catch (error) {
                console.log(error);
            }
        }})
}
}

export default AdminProductAdd;