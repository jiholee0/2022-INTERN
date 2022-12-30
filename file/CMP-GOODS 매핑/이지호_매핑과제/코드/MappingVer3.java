package com.company;

import java.io.*;
import java.util.*;

public class MappingVer3 {
    static List<String> company;
    static List<String> refine_company;
    static List<List<String>> goods;
    static List<List<String>> indcd;
    static List<List<String>> cmporgn;
    static HashMap<String, String> cmporgn_map = new HashMap<>();
    static List<String> after_mapping;
    static List<List<String>> after_mapping_full = new ArrayList<>();
    static List<List<String>> result = new ArrayList<>();

    public static void main(String[] args) {

        // goods refine
        System.out.println("시작");
        long beforeTime = System.currentTimeMillis();
        String goods_path = "C:\\Users\\NICE-DNB\\Desktop\\NSPSC_Mapping\\file\\ncm.goods.txt";

        RefineGoods refineGoods = new RefineGoods();
        goods = refineGoods.refine(goods_path);
        long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        long secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
        System.out.println("goods 시간차이(m) : " + secDiffTime);

        // goods sort(내림차순)
        System.out.println("시작");
        beforeTime = System.currentTimeMillis();
        Collections.sort(goods, new Comparator<List<String>>() {
            public int compare(List<String> o1, List<String> o2) {
                long int1 = Long.parseLong(o1.get(0));
                long int2 = Long.parseLong(o2.get(0));
                if(int2>int1) return 1;
                else return -1;
            }
        });
        afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
        System.out.println("sort 시간차이(m) : " + secDiffTime);

        // cmporgn read
        System.out.println("시작");
        beforeTime = System.currentTimeMillis();
        String cmporgn_path = "C:\\Users\\NICE-DNB\\Desktop\\NSPSC_Mapping\\file\\ncm.cmporgn.txt";

        File file = new File(cmporgn_path);
        BufferedReader br = null;
        String line = "";
        try {
            br = new BufferedReader(new java.io.FileReader(file));
            int index = 0;
            while ((line = br.readLine()) != null) { // readLine()은 파일에서 개행된 한 줄의 데이터를 읽어온다.
                while ((line = br.readLine()) != null) { // readLine()은 파일에서 개행된 한 줄의 데이터를 읽어온다.
                    List<String> aLine = new ArrayList<String>();
                    String[] lineArr = line.split("\\|"); // 파일의 한 줄을 |로 나누어 배열에 저장 후 리스트로 변환한다.
                    if (Objects.equals(lineArr[1], "1") && Objects.equals(lineArr[2], "1")) {
                        cmporgn_map.put(lineArr[0],lineArr[3]);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close(); // 사용 후 BufferedReader를 닫아준다.
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
        System.out.println("cmporgn 시간차이(m) : " + secDiffTime);

        // indcd read
        System.out.println("시작");
        beforeTime = System.currentTimeMillis();
        String indcd_path = "C:\\Users\\NICE-DNB\\Desktop\\NSPSC_Mapping\\file\\ncm.indcd.txt";

        FileReader fileReader2 = new FileReader();
        indcd = fileReader2.readFile(indcd_path, "indcd");
        afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
        System.out.println("indcd 시간차이(m) : " + secDiffTime);


        // cmp refine & mapping
        System.out.println("시작");
        beforeTime = System.currentTimeMillis();
        String cmp_path = "C:\\Users\\NICE-DNB\\Desktop\\NSPSC_Mapping\\file\\example.cmp.txt";

        file = new File(cmp_path);
        br = null;
        line = "";
        try {
            br = new BufferedReader(new java.io.FileReader(file));
            int index = 0;
            while ((line = br.readLine()) != null) { // readLine()은 파일에서 개행된 한 줄의 데이터를 읽어온다.
                String[] lineArr = line.split("\\|"); // 파일의 한 줄을 |로 나누어 배열에 저장 후 리스트로 변환한다.
                company = Arrays.asList(lineArr);
                RefineCmp refineCmp = new RefineCmp();
                refine_company = refineCmp.refine(company, index);
                // mapping
                after_mapping = mapping(refine_company, index, goods, index);
                after_mapping_full.add(after_mapping);
                index++;
                if(index%50000==0){
                    // write
                    String output_path = "C:\\Users\\NICE-DNB\\Desktop\\NSPSC_Mapping\\file\\output.txt";
                    write(output_path, after_mapping_full);
                    after_mapping_full = new ArrayList<>();
                    afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
                    secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
                    System.out.println("mapping 시간차이(m) : " + secDiffTime);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close(); // 사용 후 BufferedReader를 닫아준다.
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
        System.out.println("mapping 시간차이(m) : " + secDiffTime);

        // write
        String output_path = "C:\\Users\\NICE-DNB\\Desktop\\NSPSC_Mapping\\file\\output.txt";
        write(output_path, after_mapping_full);
    }


    public static List<String> mapping(List<String> one_company, int company_num, List<List<String>> goods, int id) {

        System.out.println(id);
        List<String> mapped_goods = new ArrayList<>();

        List<String> except1 = Arrays.asList("6013122300", "6013122301", "6013143800", "6013143801", "6013130300", "6013130301", "8311240200", "3215170300", "6013121101", "6013141501", "6013122100", "6013122101");
        List<String> except2 = Arrays.asList("3912218000", "3912218001", "1013150600", "1013150601", "1112200100", "1214190400", "1214190401", "2510000000", "2510200100", "2613000000", "2711280800", "2711280801", "3010220900", "3010220901", "3010310000", "3010350000", "3115160000", "3115160701", "3120161000", "3120161001", "4014200000", "4111310900", "4617150600", "4617150601", "4910170000", "5022110700", "5040720200", "5215166200", "5215166201", "5613160300", "6010181100", "6013111301", "6411160100", "6411180000", "7812150000", "7814160000", "8115160100", "8212150200", "8412180400", "8613150000", "9312150000", "9315150000", "9412000000", "9413180000", "9512150700", "9512151100", "9512210100", "8014170000", "4813150300", "4813150301", "4899989900", "4899989901", "2510150200", "5020220900", "5020220901", "5040350000");

        if (company_num == 0) {
            String[] input_data = {"CMP_CD", "BIZ_NO", "IND_CD1", "IND_LCLS_CD", "IND_CD_NM"
                    , "BZ_TYP_NM", "MN_BIZ_CONT", "GOODS_CD", "GOODS_GRP_GB", "GOODS_NM"
                    , "GOODS_ENG_NM", "INFO_SRC_CD"};
            List<String> line = Arrays.asList(input_data);
            return line;
        }
        String[] input_data;
        List<String> line;

        int map_num = -1;
        input_data = new String[]{"", "", "", "", "", "", "", "", "", "", "", ""};

        // 비교하는데 걸리는 시간
        long startTime = System.nanoTime();
        // goods 하나씩 돌면서 비교
        for (int j = 0; j < goods.size(); j++) {
            String B1 = goods.get(j).get(3);

            if (B1.length() != 1 || !"".equals(B1)) { // B1의 길이가 1이면 매핑 대상에서 제외됨.
                if (one_company.get(3).contains(B1) || one_company.get(4).contains(B1) || one_company.get(5).contains(B1) || one_company.get(6).contains(B1) || one_company.get(7).contains(B1) || one_company.get(8).contains(B1) || one_company.get(9).contains(B1)) { // A1~A7과 B1
                    if (one_company.get(3).equals(B1) || one_company.get(4).equals(B1) || one_company.get(5).equals(B1) || one_company.get(6).equals(B1) || one_company.get(7).equals(B1) || one_company.get(8).equals(B1) || one_company.get(9).equals(B1)) {
                        // 일대일 제외 대상인 경우
                        if (except1.contains(goods.get(j).get(0))) {
                        } else {
                            map_num = j;
                            break;
                        }
                    } else {
                        // 포함일치 제외 대상인 경우
                        if (except1.contains(goods.get(j).get(0)) || except2.contains(goods.get(j).get(0))) {
                        } else {
                            map_num = j;
                        }
                    }
                }
            }
            // 매핑 성공하지 못한 COMPANY & 3단계 매핑 성공 COMPANY
            String B2 = goods.get(j).get(5);
            if (!"".equals(B2)) {
                if (one_company.get(3).contains(B2) || one_company.get(4).contains(B2) || one_company.get(5).contains(B2) || one_company.get(6).contains(B2) | one_company.get(7).contains(B2) || one_company.get(8).contains(B2) || one_company.get(9).contains(B2)) { // A1~A7과 B2
                    if (one_company.get(3).equals(B2) || one_company.get(4).equals(B2) || one_company.get(5).equals(B2) || one_company.get(6).equals(B2) || one_company.get(7).equals(B2) || one_company.get(8).equals(B2) || one_company.get(9).equals(B2)) {
                        // 일대일 제외 대상인 경우
                        if (except1.contains(goods.get(j).get(0))) {
                        } else {
                            map_num = j;
                            break;
                        }
                    } else if (map_num != 3) { // 3단계에서 이미 성공한 company는 x

                        // 포함일치 제외 대상인 경우
                        if (except1.contains(goods.get(j).get(0)) || except2.contains(goods.get(j).get(0))) {
                        } else {
                            map_num = j;
                            break;
                        }
                    }
                }
            }
            if (map_num != -1) {
                break;
            }
        }
        if (map_num == -1) {
            // 추가 작업
            List<List<String>> addition_goods = new ArrayList<List<String>>();
            addition_goods.add(Arrays.asList("9010150101", "Detail", "음식점서비스", "Restaurants", "08"));
            addition_goods.add(Arrays.asList("9010170000", "Class", "간이음식점업", "Cafeteria services", "08"));
            addition_goods.add(Arrays.asList("8014170300", "Commodity", "소매점유통서비스", "Retail distribution services", "UNS"));
            addition_goods.add(Arrays.asList("5310180201", "Detail", "남성용외투", "Mens overcoats", "08"));
            addition_goods.add(Arrays.asList("5310180401", "Detail", "여성용외투", "Women overcoats", "08"));
            addition_goods.add(Arrays.asList("9010150300", "Commodity", "패스트푸드점", "Fast food establishments", "UNS"));
            addition_goods.add(Arrays.asList("8614000000", "Family", "교육편의시설", "Educational facilities", "08"));
            addition_goods.add(Arrays.asList("5011159801", "Detail", "식육류", "Fresh meat or poultry", "08"));
            addition_goods.add(Arrays.asList("5310160000", "Class", "셔츠및블라우스", "Shirts and blouses", "08"));
            addition_goods.add(Arrays.asList("8013159801", "Detail", "부동산임대서비스", "Lease and rental of real estate services", "08"));
            addition_goods.add(Arrays.asList("8512200100", "Commodity", "치과의사서비스", "Dentist services", "UNS"));
            addition_goods.add(Arrays.asList("7313160700", "Commodity", "정육점서비스", "Butcher services", "UNS"));
            addition_goods.add(Arrays.asList("2510150200", "Commodity", "버스", "Busses", "08"));
            addition_goods.add(Arrays.asList("7818170100", "Commodity", "차량주유", "Vehicle fueling service", "UNS"));
            addition_goods.add(Arrays.asList("7313000000", "Family", "식음료품산업", "Food and beverage industries", "08"));
            addition_goods.add(Arrays.asList("9110169900", "Commodity", "미용관련용역", "Face and body and hair care and adornment", "08"));
            addition_goods.add(Arrays.asList("8510170600", "Commodity", "전통적건강 관리서비스", "Traditional healthcare services", "UNS"));
            addition_goods.add(Arrays.asList("8500000000", "Segment", "보건서비스", "Healthcare Services", "08"));
            int is_exist = -1;
            List<String> temp = new ArrayList<>();
            for (int index = 0; index < 7; index++) { // A1~A7
                if (!Objects.equals(one_company.get(index), "")) {
                    temp.add(one_company.get(index));
                }
            }
            for (int index = 0; index < temp.size(); index++) {
                int add = -1;
                switch (one_company.get(index)) {
                    case "한식":
                    case "음식점":
                    case "중식":
                    case "일식":
                    case "양식": {
                        add = 0;
                        break;
                    }
                    case "간이음식포장":
                    case "간이음식": {
                        add = 1;
                        break;
                    }
                    case "슈퍼마켓":
                    case "수퍼마켓":
                    case "편의점":
                    case "종합몰": {
                        add = 2;
                        break;
                    }
                    case "남자용겉옷": {
                        add = 3;
                        break;
                    }
                    case "여성용겉옷": {
                        add = 4;
                        break;
                    }
                    case "햄버거":
                    case "치킨": {
                        add = 5;
                        break;
                    }
                    case "학원": {
                        add = 6;
                        break;
                    }
                    case "육류": {
                        add = 7;
                        break;
                    }
                    case "셔츠":
                    case "블라우스": {
                        add = 8;
                        break;
                    }
                    case "부동산": {
                        add = 9;
                        break;
                    }
                    case "치과": {
                        add = 10;
                        break;
                    }
                    case "정육점":
                    case "육류소매업": {
                        add = 11;
                        break;
                    }
                    case "전세버스":
                    case "통근버스":
                    case "시내버스":
                    case "마을버스": {
                        add = 12;
                        break;
                    }
                    case "주유소":
                    case "주유서비스": {
                        add = 13;
                        break;
                    }
                    case "식품":
                    case "음료": {
                        add = 14;
                        break;
                    }
                    case "미용실":
                    case "이발소":
                    case "미용":
                    case "이미용":
                    case "피부미용업": {
                        add = 15;
                        break;
                    }
                    case "한의원": {
                        add = 16;
                        break;
                    }
                    case "병원": {
                        add = 17;
                        break;
                    }
                }
                if (add >= 0) {
                    input_data[7] = addition_goods.get(add).get(0); // GOODS_CD
                    input_data[8] = addition_goods.get(add).get(1); // GOODS_GRP_GB
                    input_data[9] = addition_goods.get(add).get(2); // GOODS_NM
                    input_data[10] = addition_goods.get(add).get(3); // GOODS_ENG_NM
                    input_data[11] = addition_goods.get(add).get(4); // INFO_SRC_CD
                }
            }
        }

        // 비교하는데 걸리는 시간
        long finishTime = System.nanoTime();
        long elapsedTime = finishTime - startTime;

        System.out.println("비교 시간 elapsedTime(ns) : " + elapsedTime);

        startTime = System.nanoTime();
        input_data[0] = one_company.get(0); // CMP_CD
        input_data[1] = one_company.get(1); // BIZ_NO
        input_data[2] = one_company.get(10); // IND_CD1

        finishTime = System.nanoTime();
        elapsedTime = finishTime - startTime;

        System.out.println("값 넣는데 걸리는 시간 1차 elapsedTime(ns) : " + elapsedTime);

        startTime = System.nanoTime();
        for (List<String> one_indcd : indcd) {
            if (Objects.equals(one_company.get(10), one_indcd.get(1))) {
                input_data[3] = one_indcd.get(2); // IND_LCLS_CD
                input_data[4] = one_indcd.get(3); // IND_CD_NM
                break;
            }
        }
        finishTime = System.nanoTime();
        elapsedTime = finishTime - startTime;

        System.out.println("값 넣는데 걸리는 시간 indcd elapsedTime(ns) : " + elapsedTime);

        startTime = System.nanoTime();

        input_data[5] = cmporgn_map.get(one_company.get(0));

        finishTime = System.nanoTime();
        elapsedTime = finishTime - startTime;

        System.out.println("값 넣는데 걸리는 시간 cmporgn elapsedTime(ns) : " + elapsedTime);

        input_data[6] = one_company.get(2); // MN_BIZ_CONT

        if (map_num != -1) { // 매핑 성공한 company
            mapped_goods = goods.get(map_num);
            input_data[7] = mapped_goods.get(0); // GOODS_CD
            input_data[8] = mapped_goods.get(2); // GOODS_GRP_GB
            input_data[9] = mapped_goods.get(3); // GOODS_NM
            input_data[10] = mapped_goods.get(4); // GOODS_ENG_NM
            input_data[11] = mapped_goods.get(6); // GOODS_ENG_NM
        }
        line = Arrays.asList(input_data);
        return line;
    }

    public static void write(String path, List<List<String>> result) {
        File file = new File(path);
        BufferedWriter bw = null; // 출력 스트림 생성
        try {
            bw = new BufferedWriter(new FileWriter(file,true));
            String str="";

            for(int index = 0;index<result.size();index++){
                List<String> data = result.get(index);
                String line = "";
                line = data.get(0) + "|" + data.get(1) + "|" + data.get(2) + "|" +
                        data.get(3) + "|" + data.get(4) + "|" + data.get(5) + "|" +
                        data.get(6) + "|" + data.get(7) + "|" + data.get(8) + "|" +
                        data.get(9) + "|" + data.get(10) + "|" + data.get(11)+"\n";
                str = str+line;
            }

            // 한 줄에 넣을 각 데이터 사이에 |를 넣는다
            bw.write(str);
            // 작성한 데이터를 파일에 넣는다
            bw.newLine(); // 개행

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.flush(); // 남아있는 데이터까지 보내 준다
                    bw.close(); // 사용한 BufferedWriter를 닫아 준다
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}




