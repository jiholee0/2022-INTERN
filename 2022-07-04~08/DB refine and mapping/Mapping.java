package com.company;

import java.io.*;
import java.util.*;

public class Mapping {
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
        String goods_path = "C:\\Users\\file\\goods.txt";

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
        String cmporgn_path = "C:\\Users\\file\\cmporgn.txt";

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
        String indcd_path = "C:\\Users\\file\\indcd.txt";

        FileReader fileReader2 = new FileReader();
        indcd = fileReader2.readFile(indcd_path, "indcd");
        afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
        System.out.println("indcd 시간차이(m) : " + secDiffTime);


        // cmp refine & mapping
        System.out.println("시작");
        beforeTime = System.currentTimeMillis();
        String cmp_path = "C:\\Users\\file\\cmp.txt";

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
                    String output_path = "C:\\Users\\file\\output.txt";
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
        String output_path = "C:\\Users\\file\\output.txt";
        write(output_path, after_mapping_full);
    }


    public static List<String> mapping(List<String> one_company, int company_num, List<List<String>> goods, int id) {

        System.out.println(id);
        List<String> mapped_goods = new ArrayList<>();

        List<String> except1 = Arrays.asList();
        List<String> except2 = Arrays.asList();

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




