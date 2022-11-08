export const pagination = (data: any) => {
    const total_page = Math.ceil(data.count / data.per_page);
    const total_perpage = data.per_page;
    const current_page = data.page;
    const previous_page = current_page == 1 ? null : current_page - 1;
    const next_page = current_page == total_page ? null : current_page + 1;

    const result = {
        list: data.data,
        pagination: {
            total_records: data.count,
            total_perpage,
            total_page,
            current_page,
            next_page,
            previous_page
        }
    }

    return result;
}

export const getPage = (value: any) => {
    return parseInt(value as string) ? parseInt(value as string) : 1;
}

export const getPerPage = (value: any) => {
    return parseInt(value as string) ? parseInt(value as string) : 10;
}