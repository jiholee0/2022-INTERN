package com.company;

import java.io.*;
import java.util.*;

public class RefineGoods {
    static List<List<String>> goods;
    static List<List<String>> result = new ArrayList<>();

    public List<List<String>> refine(String path){
        readFile(path); // 파일 읽고 company 변수에 저장.
        write();
        return this.result;
    }

    public static void readFile(String path) {
        FileReader fileReader = new FileReader();
        goods = fileReader.readFile(path, "goods");
    }

    public void write() {
        String[] after_refine = {"", ""}; // 차례대로 정제된 GOODS_NM, 정제된 ALIAS_NM
        int cnt=0;

        for (int i = 0; i < goods.size(); i++) {
            List<String> data = goods.get(i);
            String[] input_data = {"", "", "", "", "", "", ""};
            List<String> line;

            // 정제함수
            if (data.get(1).equals("NSPSC")) {
                after_refine[0] = refineWord(data.get(4));
                after_refine[1] = refineWord(data.get(6));
            } else {
                continue;
            }
            if(after_refine[0].length()==1&&(after_refine[1].length()==1||after_refine[1].length()==0)){
                continue;
            }
            if (i == 0) {
                input_data[0] = "GOODS_CD";
                input_data[1] = "GOODS_CD_GB";
                input_data[2] = "GOODS_GRP_GB";
                // input_data[3] = "GOODS_CTGY";
                input_data[3] = "GOODS_NM";
                input_data[4] = "GOODS_ENG_NM";
                input_data[5] = "ALIAS_NM";
                // input_data[7] = "GOODS_DESC";
                // input_data[8] = "NOTE";
                // input_data[9] = "REG_DATE";
                // input_data[10] = "USE_YN";
                // input_data[11] = "PRT_GOODS_CD";
                input_data[6] = "INFO_SRC_CD";
                // input_data[13] = "WORKER_ID";
                // input_data[14] = "WORK_DTIM";
            } else {
                input_data[0] = data.get(0);
                input_data[1] = data.get(1);
                input_data[2] = data.get(2);
                input_data[3] = after_refine[0];
                input_data[4] = data.get(5);
                input_data[5] = after_refine[1];
                input_data[6] = data.get(13);
            }
            line = Arrays.asList(input_data);
            result.add(cnt++,line);
        }
    }

    public static String refineWord(String cmp) {
        String new_cmp = "";
        if (cmp != null) { // null이 아닌 경우만
            // 제거 대상 문자 제거
            new_cmp = cmp.replaceAll(" ", "")
                    .replace(".", "")
                    .replace("!", "")
                    .replace("~", "")
                    .replace("@", "")
                    .replace("*", "")
                    .replace("#", "")
                    .replace("ㆍ|·", "");

            // 3열 데이터에 소괄호가 있는 경우 소괄호 내용 제거
            new_cmp = new_cmp.replaceAll("\\([^\\)]+\\)", "");

            // 식물), 생), 절화), 비유전자조작), 절엽) 으로 시작할 경우 내용 제거
            if (cmp.contains("식물)") || cmp.contains("생)") || cmp.contains("절화)") ||
                    cmp.contains("비유전자조작)") || cmp.contains("절엽)")) {
                new_cmp = new_cmp.replaceAll(".*\\)", "");
            }
        }
        return new_cmp;
    }
}

